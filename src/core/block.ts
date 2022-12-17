import { makeId } from 'src/utils/make-id';
import { Emitter } from './emitter';

enum Events {
  INIT = 'init',
  FLOW_CDM = 'flow:component-did-mount',
  FLOW_CDU = 'flow:component-did-update',
  FLOW_RENDER = 'flow:render',
}

export type Params<T> = {
  props?: T;
  children?: Record<string, Block | Block[]>;
  events?: Record<string, (e: Event) => void>;
  withInternalId?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export abstract class Block<T extends Record<string, unknown> = any> {
  private readonly _emitter = new Emitter<Values<typeof Events>>();

  protected readonly children;

  private readonly _withInternalId;

  private readonly _events;

  protected readonly _id = makeId();

  private _element!: HTMLElement;

  protected props: T;

  private _DOMListeners: Array<() => void> = [];

  protected componentDidMount?(): void;

  protected componentDidUpdate?(oldProps: T, newProps: T): boolean;

  protected abstract render(props: T): DocumentFragment;

  constructor({
    props = {} as T,
    children = {},
    events = {},
    withInternalId = false,
  }: Params<T> = {}) {
    this.children = children;
    this._events = events;
    this._withInternalId = withInternalId;
    this.props = this._makePropsProxy(props);

    this._registerEvents();
    this._emitter.emit(Events.INIT);
  }

  private _registerEvents() {
    this._emitter.on(Events.INIT, this._init);
    this._emitter.on(Events.FLOW_CDM, this._componentDidMount);
    this._emitter.on(Events.FLOW_RENDER, this._render);
    this._emitter.on(Events.FLOW_CDU, this._componentDidUpdate);
  }

  private _init = () => {
    this._emitter.emit(Events.FLOW_RENDER);
  };

  private _componentDidMount = () => {
    this.componentDidMount?.();

    const dispatch = (children: Block | Block[]) => {
      if (Array.isArray(children)) {
        for (const child of children) {
          dispatch(child);
        }
      } else {
        children.dispatchComponentDidMount();
      }
    };

    for (const childEntry of Object.values(this.children)) {
      dispatch(childEntry);
    }
  };

  protected dispatchComponentDidMount = () => {
    this._emitter.emit(Events.FLOW_CDM);
  };

  private _componentDidUpdate = (oldProps: T, newProps: T) => {
    const shouldRerener = this.componentDidUpdate?.(oldProps, newProps) ?? true;

    if (shouldRerener) {
      this._emitter.emit(Events.FLOW_RENDER);
    }
  };

  setProps = (nextProps: Partial<T>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  private _render = () => {
    const fragment = this.render(this.props);
    const newElement = fragment.firstElementChild as HTMLElement;

    if (this.element) {
      this._detachListeners();
      this.element.replaceWith(newElement);
    }

    this._element = newElement;
    this._attachListeners();
  };

  protected compile(
    compileTemplate: (locals: Record<string, unknown>) => string,
    props: T
  ) {
    const propsAndStubs: Record<string, unknown> = { ...props };

    const makeStub = (id: number) => `<div data-id="${id}"></div>`;

    for (const [key, childEntry] of Object.entries(this.children)) {
      if (Array.isArray(childEntry)) {
        propsAndStubs[key] = childEntry.map((child) => makeStub(child._id));
      } else {
        propsAndStubs[key] = makeStub(childEntry._id);
      }
    }

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = compileTemplate(propsAndStubs);

    const replaceStubWithElement = (child: Block) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      stub?.replaceWith(child.element);
    };

    for (const childEntry of Object.values(this.children)) {
      if (Array.isArray(childEntry)) {
        for (const child of childEntry) {
          replaceStubWithElement(child);
        }
      } else {
        replaceStubWithElement(childEntry);
      }
    }

    return fragment.content;
  }

  get element() {
    return this._element;
  }

  private _makePropsProxy(props: T) {
    return new Proxy(props, {
      get: (target, prop, receiver) => {
        const value = Reflect.get(target, prop, receiver);
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldProps = { ...target };
        Reflect.set(target, prop, value);
        this._emitter.emit(Events.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K
  ): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName);
    if (this._withInternalId) {
      element.dataset.id = `block-${this._id}`;
    }
    return element;
  }

  private _attachListeners() {
    for (const [event, handler] of Object.entries(this._events)) {
      const selector = `[\\@${event}]`;
      let target: Nullable<HTMLElement> = this.element;

      if (!this.element.matches(selector)) {
        target = this.element.querySelector(selector);
      }

      target?.addEventListener(event, handler);
      this._DOMListeners.push(() =>
        target?.removeEventListener(event, handler)
      );
    }
  }

  private _detachListeners() {
    for (const detach of this._DOMListeners) {
      detach();
    }
    this._DOMListeners = [];
  }

  show() {
    this.element.hidden = false;
  }

  hide() {
    this.element.hidden = true;
  }

  static renderDOM(query: string, block: Block) {
    const root = document.querySelector(query);

    if (!root) {
      throw new Error('Root element not found');
    }

    root.append(block.element);
    block.dispatchComponentDidMount();

    return root;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Handler<T extends unknown[] = any[]> = (...args: T) => void;

export class Emitter<
  E extends string = string,
  M extends { [K in E]: unknown[] } = Record<E, any[]>
> {
  private events: { [key in E]?: Handler<M[E]>[] } = {};

  on(event: E, handler: Handler<M[E]>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event]!.push(handler);
    return () => this.off(event, handler);
  }

  off(event: E, handler: Handler<M[E]>) {
    if (!this.events[event]) {
      throw new Error(`No such event: ${event}`);
    }
    this.events[event] = this.events[event]!.filter(
      (_handler) => _handler !== handler
    );
  }

  emit(event: E, ...args: M[E]) {
    if (!this.events[event]) {
      throw new Error(`No such event: ${event}`);
    }
    for (const handler of this.events[event]!) {
      handler(...args);
    }
  }
}

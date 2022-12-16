import template from 'compile:./template.pug';
import { Block, Params as BlockParams } from 'src/core/block';
import { ValidationError } from 'src/utils/validation';
import { ErrorMessage } from '../ErrorMessage';

export type Props = {
  label?: string;
  size?: 'small' | 'normal';
  attrs?: Record<string, string>;
  icon?: string;
  validate?: (value: string) => void;
  value?: string;
  error?: string;
};

export class TextField extends Block<Props> {
  constructor({ children, ...params }: BlockParams<Props>) {
    super({
      ...params,
      children: { errorMessage: new ErrorMessage() },
    });
  }

  protected render(props: Props) {
    return this.compile(template, props);
  }

  get name() {
    return this.props.attrs?.name;
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    const errorMessage = this.children.errorMessage as ErrorMessage;
    if (oldProps.error !== newProps.error) {
      errorMessage.setProps({
        message: newProps.error,
      });
    }
    return true;
  }

  validate() {
    try {
      this.props.validate?.(this.props.value || '');
      this.setProps({ error: '' });
      return true;
    } catch (error: unknown) {
      if (error instanceof ValidationError) {
        this.setProps({ error: error.first });
      }
      return false;
    }
  }
}

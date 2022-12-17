import { Block } from 'src/core/block';
import template from 'compile:./template.pug';

type Props = {
  message?: string;
};

export class ErrorMessage extends Block<Props> {
  constructor({ message = '' }: Props = {}) {
    super({ props: { message } });
  }

  render(props: Props) {
    return this.compile(template, props);
  }
}

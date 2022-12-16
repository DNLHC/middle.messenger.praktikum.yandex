import { Block } from 'src/core/block';
import template from 'compile:./template.pug';
import { validateForm } from 'src/utils/form-helpers';
import { TextField } from '../TextField';

type Link = {
  text: string;
  to: string;
};

type Props = {
  title: string;
  submitText: string;
  link: Link;
};

export class AuthForm extends Block<Props> {
  protected render(props: Props) {
    return this.compile(template, props);
  }

  validate(e: Event) {
    return validateForm(e, this.children.fields as TextField[]);
  }
}

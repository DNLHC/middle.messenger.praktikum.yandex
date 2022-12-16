import { Block } from 'src/core/block';
import template from 'compile:./template.pug';

type Props = {
  title: string;
};

export class ProfileLayout extends Block<Props> {
  protected render(props: Props) {
    return this.compile(template, props);
  }
}

import { Block } from 'src/core/block';
import template from 'compile:./template.pug';

type Props = {
  attrs?: Record<string, string>;
};

export class AvatarField extends Block<Props> {
  protected render(props: Props) {
    return this.compile(template, props);
  }
}

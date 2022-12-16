import template from 'compile:./template.pug';
import { Block } from 'src/core/block';

type Props = {
  avatar: URL;
  name: string;
  online: boolean;
  attrs?: Record<string, string>;
};

export class UserAvatar extends Block<Props> {
  constructor(props: Props) {
    super({ props });
  }

  protected render(props: Props) {
    return this.compile(template, props);
  }
}

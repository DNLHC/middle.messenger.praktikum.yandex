import { Block } from 'src/core/block';
import template from 'compile:./template.pug';

type Props = {
  unreadMessages?: number;
  attrs: Record<string, string>;
};

export class NotificationBadge extends Block<Props> {
  constructor(props: Props) {
    super({ props });
  }

  protected render(props: Props) {
    return this.compile(template, props);
  }
}

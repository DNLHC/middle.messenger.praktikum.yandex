import template from 'compile:./template.pug';
import { Block } from 'src/core/block';
import { UserAvatar } from '../UserAvatar';

const avatar = new URL('~/src/assets/images/avatar.jpg', import.meta.url);

export class ChatHeader extends Block {
  constructor() {
    super({
      children: {
        userAvatar: new UserAvatar({
          name: 'Анна',
          online: true,
          avatar,
          attrs: { class: 'ChatHeader_avatar' },
        }),
      },
    });
  }

  protected render() {
    return this.compile(template, {});
  }
}

import { Block } from 'src/core/block';
import template from 'compile:./template.pug';
import { emitter, ChatEvents } from 'src/services/events.service';

import { UserAvatar } from '../UserAvatar';
import { NotificationBadge } from '../NotificationBadge';

type Props = {
  id: number;
  status: string;
  lastMessage: string;
  name: string;
  date: string;
  unreadMessages?: number;
  avatar: URL;
  shortDate: string;
  authorIsUser: boolean;
  isActive: boolean;
};

export class ChatListItem extends Block<Props> {
  constructor(props: Props) {
    const { avatar, unreadMessages, name, status, id } = props;

    super({
      props,
      children: {
        userAvatar: new UserAvatar({
          name,
          online: status === 'online',
          avatar,
          attrs: { class: 'ChatListItem_avatar' },
        }),
        notificationBadge: new NotificationBadge({
          unreadMessages,
          attrs: {
            class: 'ChatListItem_notifications',
            'aria-hidden': 'true',
          },
        }),
      },
      events: {
        click: () => {
          emitter.emit(ChatEvents.SELECT, id);
        },
      },
    });
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props) {
    return oldProps.isActive !== newProps.isActive;
  }

  get id() {
    return this.props.id;
  }

  protected render(props: Props) {
    return this.compile(template, props);
  }
}

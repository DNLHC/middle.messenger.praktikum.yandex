import { Block } from 'src/core/block';
import { ChatListItem } from 'src/components/Chat/ChatListItem';
import template from 'compile:./template.pug';
import { chats } from 'src/constants';
import { emitter, ChatEvents } from 'src/services/events.service';

type Props = {
  activeChatId: number;
};

const avatar = new URL('~/src/assets/images/avatar.jpg', import.meta.url);

export class ChatList extends Block<Props> {
  constructor(props: Props) {
    super({
      props,
      children: {
        chats: chats.map(
          (chat) =>
            new ChatListItem({
              ...chat,
              avatar,
              authorIsUser: chat.authorIsUser ?? false,
              isActive: chat.id === props.activeChatId,
            })
        ),
      },
    });
  }

  protected componentDidMount() {
    emitter.on(ChatEvents.SELECT, (chatId: number) => {
      this.setProps({ activeChatId: chatId });

      for (const child of this.children.chats as ChatListItem[]) {
        child.setProps({ isActive: child.id === chatId });
      }
    });
  }

  protected componentDidUpdate() {
    return false;
  }

  protected render(props: Props) {
    return this.compile(template, props);
  }
}

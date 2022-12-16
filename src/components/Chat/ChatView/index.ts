import { Block } from 'src/core/block';
import { messages } from 'src/constants';
import { emitter, ChatEvents } from 'src/services/events.service';
import template from 'compile:./template.pug';
import { MessageComposer } from '../MessageComposer';
import { ChatHeader } from '../ChatHeader';
import { Message } from '../Message';

type Props = {
  activeChatId: Nullable<number>;
  attrs?: Record<string, string>;
};

export class ChatView extends Block<Props> {
  constructor(props: Props) {
    super({
      props,
      children: {
        messages: messages.map((message) => new Message(message)),
        chatHeader: new ChatHeader(),
        messageComposer: new MessageComposer({
          attrs: { class: 'ChatView_messageComposer' },
        }),
      },
    });
  }

  protected componentDidMount() {
    emitter.on(ChatEvents.SELECT, (chatId: number) => {
      this.setProps({ activeChatId: chatId });
    });

    emitter.on(ChatEvents.DELETE, (chatId: number) => {
      if (chatId === this.props.activeChatId) {
        this.setProps({ activeChatId: null });
      }
    });
  }

  protected render(props: Props) {
    return this.compile(template, props);
  }
}

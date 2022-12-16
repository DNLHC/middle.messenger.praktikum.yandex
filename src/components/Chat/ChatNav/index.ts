import { Block } from 'src/core/block';
import template from 'compile:./template.pug';
import { ActionBar } from 'src/components/Chat/ActionBar';
import { ChatList } from 'src/components/Chat/ChatList';

type Props = {
  activeChatId: number;
  attrs?: Record<string, string>;
};

export class ChatNav extends Block<Props> {
  constructor(props: Props) {
    super({
      props,
      children: {
        actionBar: new ActionBar(),
        chatList: new ChatList({
          activeChatId: props.activeChatId,
        }),
      },
    });
  }

  protected render(props: Props) {
    return this.compile(template, props);
  }
}

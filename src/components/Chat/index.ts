import template from 'compile:./template.pug';
import { Block } from 'src/core/block';
import { ChatNav } from './ChatNav';
import { ChatView } from './ChatView';

export class Chat extends Block {
  constructor() {
    const activeChatId = 0;

    const chatNav = new ChatNav({
      activeChatId,
      attrs: { class: 'Chat_leftPanel' },
    });

    const chatView = new ChatView({
      activeChatId,
      attrs: { class: 'Chat_mainView' },
    });

    super({ children: { chatNav, chatView } });
  }

  render() {
    return this.compile(template, {});
  }
}

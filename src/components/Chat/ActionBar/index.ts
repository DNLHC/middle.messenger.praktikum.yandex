import { Block } from 'src/core/block';
import template from 'compile:./template.pug';
import { TextField } from 'src/components/TextField';

export class ActionBar extends Block {
  constructor() {
    const searchField = new TextField({
      props: {
        size: 'small',
        label: 'Поиск',
        icon: 'search',
        attrs: {
          placeholder: 'Поиск',
          name: 'chat-search',
        },
      },
    });
    super({ children: { searchField } });
  }

  protected render() {
    return this.compile(template, {});
  }
}

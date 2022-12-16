import { Block } from 'src/core/block';
import { TextField } from 'src/components/TextField';
import template from 'compile:./template.pug';
import { isEmpty } from 'src/utils/validation';

type Props = {
  attrs: Record<string, string>;
};

export class MessageComposer extends Block<Props> {
  constructor(props: Props) {
    const textField = new TextField({
      props: {
        attrs: {
          class: 'MessageComposer_input',
          autocomplete: 'off',
          placeholder: 'Введите сообщение',
          name: 'message',
        },
      },
    });
    super({
      props,
      children: { textField },
      events: {
        submit: (e: Event) => {
          this.sendMessage(e);
        },
      },
    });
  }

  private sendMessage(e: Event) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const message = form.get('message') as string;

    if (isEmpty(message)) {
      // eslint-disable-next-line no-console
      console.error('Message field is empty');
    } else {
      const textField = this.children.textField as TextField;
      const inputElement = textField.element.querySelector(
        'input'
      ) as HTMLInputElement;
      inputElement.value = '';
      // eslint-disable-next-line no-console
      console.log(`Message has been sent (not really): '${message}'`);
    }
  }

  protected render(props: Props) {
    return this.compile(template, props);
  }
}

import { Block } from 'src/core/block';
import { TextField } from 'src/components/TextField';
import template from 'compile:./change-password.pug';
import { testPassword, isEmpty, ValidationError } from 'src/utils/validation';
import { validateForm, createTextField } from 'src/utils/form-helpers';

export class ChangePassword extends Block {
  constructor() {
    const formModel = {
      oldPassword: '',
      newPassword: '',
      newPasswordSecond: '',
    };

    const onChange = (event: Event) => {
      const { value = '', name } = event.target as HTMLInputElement;

      if (Reflect.has(formModel, name)) {
        Reflect.set(formModel, name, value);
      }
    };

    super({
      children: {
        fields: [
          createTextField(
            {
              label: 'Старый пароль',
              attrs: {
                type: 'password',
                name: 'oldPassword',
                autofocus: 'true',
              },
              validate: testPassword,
            },
            onChange
          ),
          createTextField(
            {
              label: 'Новый пароль',
              attrs: {
                type: 'password',
                name: 'newPassword',
              },
              validate: testPassword,
            },
            onChange
          ),
          createTextField(
            {
              label: 'Повторите новый пароль',
              attrs: {
                type: 'password',
                name: 'newPasswordSecond',
              },
              validate: (value: string) => {
                if (isEmpty(value)) {
                  throw new ValidationError('Поле не может быть пустым');
                }

                if (value !== formModel.newPassword) {
                  throw new ValidationError('Пароли не совпадают');
                }
              },
            },
            onChange
          ),
        ],
      },
      events: {
        submit: (e: Event) => {
          e.preventDefault();
          this.onSubmit(e);
        },
      },
    });
  }

  onSubmit(e: Event) {
    const { valid, data } = validateForm(
      e,
      this.children.fields as TextField[]
    );
    if (valid) {
      // eslint-disable-next-line no-console
      console.log('success', data);
    }
  }

  render() {
    return this.compile(template, {});
  }
}

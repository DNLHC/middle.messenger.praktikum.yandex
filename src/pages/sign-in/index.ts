import { AuthForm } from 'src/components/AuthForm';
import { Block } from 'src/core/block';
import { createTextField } from 'src/utils/form-helpers';
import { testLogin, testPassword } from 'src/utils/validation';

const authForm = new AuthForm({
  props: {
    title: 'Вход',
    submitText: 'Войти',
    link: {
      text: 'Нет аккаунта?',
      to: '/sign-up',
    },
  },
  children: {
    fields: [
      createTextField({
        label: 'Логин',
        attrs: {
          name: 'login',
          autofocus: 'true',
        },
        validate: testLogin,
      }),
      createTextField({
        label: 'Пароль',
        attrs: {
          type: 'password',
          name: 'password',
        },
        validate: testPassword,
      }),
    ],
  },
  events: {
    submit: (e: Event) => {
      e.preventDefault();
      const { valid, data } = authForm.validate(e);
      if (valid) {
        // eslint-disable-next-line no-console
        console.log('success', data);
      }
    },
  },
});

Block.renderDOM('#app', authForm);

import { AuthForm } from 'src/components/AuthForm';
import { Block } from 'src/core/block';
import {
  testName,
  testLogin,
  testEmail,
  testPassword,
  testPhone,
  isEmpty,
  ValidationError,
} from 'src/utils/validation';
import { createTextField } from 'src/utils/form-helpers';

const formModel = {
  login: '',
  email: '',
  phone: '',
  first_name: '',
  second_name: '',
  password: '',
  password_second: '',
};

const onChange = (event: Event) => {
  const { value = '', name } = event.target as HTMLInputElement;

  if (Reflect.has(formModel, name)) {
    Reflect.set(formModel, name, value);
  }
};

const fields = [
  createTextField(
    {
      label: 'Логин',
      attrs: {
        name: 'login',
        autofocus: 'true',
      },
      validate: testLogin,
    },
    onChange
  ),
  createTextField(
    {
      label: 'Почта',
      attrs: {
        type: 'email',
        name: 'email',
      },
      validate: testEmail,
    },
    onChange
  ),
  createTextField(
    {
      label: 'Имя',
      attrs: {
        name: 'first_name',
      },
      validate: testName,
    },
    onChange
  ),
  createTextField(
    {
      label: 'Фамилия',
      attrs: {
        name: 'second_name',
      },
      validate: testName,
    },
    onChange
  ),
  createTextField(
    {
      label: 'Телефон',
      attrs: {
        type: 'tel',
        name: 'phone',
      },
      validate: testPhone,
    },
    onChange
  ),
  createTextField(
    {
      label: 'Пароль',
      attrs: {
        type: 'password',
        name: 'password',
      },
      validate: testPassword,
    },
    onChange
  ),
  createTextField(
    {
      label: 'Пароль (еще раз)',
      attrs: {
        type: 'password',
        name: 'password_second',
      },
      validate: (value: string) => {
        if (isEmpty(value)) {
          throw new ValidationError('Поле не может быть пустым');
        }

        if (value !== formModel.password) {
          throw new ValidationError('Пароли не совпадают');
        }
      },
    },
    onChange
  ),
];

const authForm = new AuthForm({
  props: {
    title: 'Регистрация',
    submitText: 'Создать аккаунт',
    link: {
      text: 'Есть аккаунт?',
      to: '/sign-in',
    },
  },
  children: { fields },
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

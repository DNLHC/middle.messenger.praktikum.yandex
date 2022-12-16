import { Block } from 'src/core/block';
import { TextField } from 'src/components/TextField';
import { AvatarField } from 'src/components/AvatarField';
import template from 'compile:./edit-profile.pug';
import { validateForm, createTextField } from 'src/utils/form-helpers';
import {
  testName,
  testLogin,
  testPhone,
  testEmail,
} from 'src/utils/validation';
import { userProfile } from 'src/constants';

export class EditProfile extends Block {
  constructor() {
    super({
      children: {
        avatarField: new AvatarField({
          props: { attrs: { form: 'edit-profile-form' } },
        }),
        fields: [
          createTextField({
            label: 'Логин',
            attrs: {
              name: 'login',
              autofocus: 'true',
            },
            value: userProfile.login.value,
            validate: testLogin,
          }),
          createTextField({
            label: 'Почта',
            attrs: {
              type: 'email',
              name: 'email',
            },
            value: userProfile.email.value,
            validate: testEmail,
          }),
          createTextField({
            label: 'Имя',
            attrs: {
              name: 'first_name',
            },
            value: userProfile.first_name.value,
            validate: testName,
          }),
          createTextField({
            label: 'Фамилия',
            attrs: {
              name: 'second_name',
            },
            value: userProfile.second_name.value,
            validate: testName,
          }),
          createTextField({
            label: 'Имя в чате',
            attrs: {
              name: 'display_name',
            },
            value: userProfile.display_name.value,
            validate: testName,
          }),
          createTextField({
            label: 'Телефон',
            attrs: {
              name: 'phone',
              autocomplete: 'tel',
              type: 'tel',
            },
            value: userProfile.phone.value,
            validate: testPhone,
          }),
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

  onSubmit(event: Event) {
    const { valid, data } = validateForm(
      event,
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

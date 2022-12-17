import { Block } from 'src/core/block';
import { ProfileLayout } from 'src/components/ProfileLayout';
import { ChangePassword } from './change-password';

const changePassword = new ChangePassword();

const profileLayout = new ProfileLayout({
  props: {
    title: 'Изменить пароль',
  },
  children: { body: changePassword },
});

Block.renderDOM('#app', profileLayout);

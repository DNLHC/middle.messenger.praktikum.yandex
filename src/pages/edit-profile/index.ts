import { Block } from 'src/core/block';
import { ProfileLayout } from 'src/components/ProfileLayout';
import { EditProfile } from './edit-profile';

const profileLayout = new ProfileLayout({
  props: {
    title: 'Редактировать профиль',
  },
  children: { body: new EditProfile() },
});

Block.renderDOM('#app', profileLayout);

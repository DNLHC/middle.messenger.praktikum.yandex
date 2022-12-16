import { Block } from 'src/core/block';
import { ProfileLayout } from 'src/components/ProfileLayout';
import { userProfile } from 'src/constants';
import { Profile } from './profile';

const profile = new Profile({
  userProfile,
});

const profileLayout = new ProfileLayout({
  props: { title: 'Профиль' },
  children: { body: profile },
});

Block.renderDOM('#app', profileLayout);

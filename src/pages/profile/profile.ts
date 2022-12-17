import { Block } from 'src/core/block';
import { AvatarField } from 'src/components/AvatarField';
import template from 'compile:./profile.pug';

type ProfileField = {
  name: string;
  value: string;
};

type Props = {
  userProfile: Record<string, ProfileField>;
};

export class Profile extends Block<Props> {
  constructor(props: Props) {
    const avatarField = new AvatarField();

    super({
      props,
      children: { avatarField },
    });
  }

  render(props: Props) {
    return this.compile(template, props);
  }
}

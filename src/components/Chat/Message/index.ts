import { Block } from 'src/core/block';
import template from 'compile:./template.pug';

type Props = {
  content: string;
  date: string;
  shortDate: string;
  userIsAuthor: boolean;
};

export class Message extends Block {
  constructor(props: Props) {
    super({ props });
  }

  protected render(props: Props) {
    return this.compile(template, props);
  }
}

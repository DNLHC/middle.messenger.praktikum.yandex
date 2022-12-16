import { Block } from 'src/core/block';
import template from 'compile:./template.pug';

type Props = {
  title: string;
  subtitle: string;
};

export class ErrorPage extends Block<Props> {
  constructor(props: Props) {
    super({ props });
  }

  protected render() {
    return this.compile(template, this.props);
  }
}

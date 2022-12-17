import { Block } from 'src/core/block';
import { ErrorPage } from 'src/components/ErrorPage';

const errorPage = new ErrorPage({
  title: '500',
  subtitle: 'Всё сломалось',
});

Block.renderDOM('#app', errorPage);

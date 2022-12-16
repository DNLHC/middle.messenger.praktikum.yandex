import { Block } from 'src/core/block';
import { ErrorPage } from 'src/components/ErrorPage';

const errorPage = new ErrorPage({
  title: '404',
  subtitle: 'Страница не найдена',
});

Block.renderDOM('#app', errorPage);

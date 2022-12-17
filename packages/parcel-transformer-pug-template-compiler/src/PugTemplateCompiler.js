const pug = require('pug');
const path = require('path');
const { Transformer } = require('@parcel/plugin');

const SRC_RE = /src=\\*?['"](.*?)\\*?['"]/g;

const transformer = new Transformer({
  async transform({ asset }) {
    if (asset.type !== 'pug') {
      return [asset];
    }

    const source = await asset.getCode();

    // Компилируем шаблон в рендер функцию для клиента
    const code = pug.compileClientWithDependenciesTracked(source, {
      compileDebug: false,
      basedir: path.dirname(asset.filePath),
      filename: asset.filePath,
      pretty: false,
    });

    for (const filePath of code.dependencies) {
      await asset.invalidateOnFileChange(filePath);
    }

    // Т.к шаблон больше не компилируется в HTML, все URL зависимости
    // (картинки, ссылки) больше не резолвятся parcel'ом
    // поэтому делаем это сами
    const makeURL = (src) => `new URL('${src}', import.meta.url)`;
    const chunks = ['module.exports = (function() {'];
    const resources = [];

    const result = code.body.replaceAll(SRC_RE, (m, dep) => {
      const url = dep.replaceAll(/\\u002F/g, '/');
      const resourceVarName = `_RESOURCE_${resources.length}_`;

      // result:
      // var _RESOURCE_0_ = new URL('picture.jpg', import.meta.url);
      resources.push(`var ${resourceVarName} = ${makeURL(url)};`);
      return `src=\\"" + ${resourceVarName} + "\\"`;
    });

    chunks.push(...resources, result, ' return template})();');

    asset.type = 'js';
    asset.setCode(chunks.join(''));
    asset.sideEffects = false;

    return [asset];
  },
});

exports.default = transformer;

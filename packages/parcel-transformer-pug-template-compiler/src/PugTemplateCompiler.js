const pug = require('pug');
const path = require('path');
const { Transformer } = require('@parcel/plugin');

const transformer = new Transformer({
  async transform({ asset }) {
    if (asset.type !== 'pug') {
      return [asset];
    }

    const content = await asset.getCode();
    // Компилируем шаблон в рендер функцию для клиента
    const fn = pug.compileClient(content, {
      compileDebug: false,
      basedir: path.dirname(asset.filePath),
      filename: asset.filePath,
      pretty: false,
    });

    asset.type = 'js';
    asset.setCode(`module.exports = (function() {${fn} return template})();`);
    asset.sideEffects = false;

    return [asset];
  },
});

exports.default = transformer;

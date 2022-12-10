module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: [
    'stylelint-declaration-block-no-ignored-properties',
    'stylelint-csstree-validator',
  ],
  rules: {
    'declaration-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: [
          'after-declaration',
          'after-comment',
          'inside-single-line-block',
        ],
      },
    ],
    'selector-class-pattern': null,
    'custom-property-pattern': null,

    'custom-property-empty-line-before': null,
    'alpha-value-notation': 'number',
    // base
    'max-nesting-depth': 4,
    'import-notation': 'string',
    'string-quotes': 'single',
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes', 'compose-with'],
      },
    ],

    // url() function
    'function-url-no-scheme-relative': true, // use explicit https
    'function-url-quotes': 'always',

    // fonts
    'font-weight-notation': 'numeric',

    // media queries
    'media-feature-name-no-unknown': true,
    'media-query-list-comma-newline-before': 'never-multi-line',

    // vendor prefixes are forbidden, use autoprefixer
    'at-rule-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'selector-no-vendor-prefix': true,
    'plugin/declaration-block-no-ignored-properties': true,
  },
  ignoreFiles: ['dist/**/*.css'],
};

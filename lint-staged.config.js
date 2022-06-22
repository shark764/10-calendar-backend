// lint-staged.config.js

// const { lintStagedBaseConfig } = require('@2600hz/commio-native-utilities');

module.exports = {
  '*.ts': ['yarn run prettify', () => 'tsc --noEmit'],
};

/*!
 * All the code that follow is
 * Copyright (c) 2015 - 2025 Richard Huang <rickypc@users.noreply.github.com>.
 * All Rights Reserved. Not for reuse without permission.
 */

module.exports = function babelConfig(api) {
  api.cache.using(() => process.env.BABEL_ENV || process.env.NODE_ENV);
  // eslint-disable-next-line global-require
  const module = require('@docusaurus/babel/preset');
  const preset = module.default || module;
  if (api.caller((caller) => caller?.name === 'babel-jest')) {
    const { caller } = api;
    // eslint-disable-next-line no-param-reassign
    api.caller = (fn) => fn({ name: 'server' });
    const config = preset(api);
    // eslint-disable-next-line no-param-reassign
    api.caller = caller;
    return config;
  }
  return preset(api);
};

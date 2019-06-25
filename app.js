'use strict';

const instance = require('./index');

module.exports = app => {
  if (app.config.geetest) instance(app);
};

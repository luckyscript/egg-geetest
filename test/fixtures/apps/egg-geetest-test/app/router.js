'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/home', controller.home.home);
};

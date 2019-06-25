'use strict';

const mock = require('egg-mock');

describe('test/egg-geetest.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/egg-geetest-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  // it('should GET /', () => {
  //   return app.httpRequest()
  //     .get('/')
  //     .expect('hi, eggGeetest')
  //     .expect(200);
  // });

  it('should GET /home', () => {
    return app.httpRequest()
      .get('/home')
      .expect(200);
  });
});

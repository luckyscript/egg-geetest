'use strict';

const assert = require('assert');

module.exports = app => {
  app.addSingleton('geetest', createGeetest);
};

function createGeetest(config, app) {
  const Geetest = app.config.geetest.Geetest || require('gt3-sdk');
  assert(config.geetest_id && config.geetest_key, '[egg-geetest] geetest_id and geetest_key is required');
  const { geetest_id, geetest_key } = config;
  const instance = new Geetest({ geetest_id, geetest_key });
  const geetest = {};
  geetest.instance = instance;

  geetest.registerPromise = () => {
    return new Promise((res, rej) => instance.register(null, (err, data) => {
      if (err) {
        rej(err);
      }
      res(data);
    }));
  };

  geetest.validatePromise = (gt, gtSec) => {
    return new Promise((resolve, reject) =>
      instance.validate(gt, gtSec, (err, success) => {
        if (err) {
          reject(err);
        }
        if (!success) {
          reject(new Error('验证码已过期'));
        }
        resolve('success');
      })
    );
  };

  geetest.twoStepCheck = ({
    gt,
    geetest_challenge,
    geetest_validate,
    geetest_seccode,
  }) => instance.validatePromise(gt, { geetest_challenge, geetest_validate, geetest_seccode });

  return geetest;
}


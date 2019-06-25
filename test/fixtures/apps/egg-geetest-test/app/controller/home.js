'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.eggGeetest.name;
  }
  async home() {
    const { app } = this;
    const data = await app.geetest.registerPromise();
    this.ctx.body = data;
  }
}

module.exports = HomeController;

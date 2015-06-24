var Router = require('koa-router');

var loginApi = require('./loginApi.js');

var simulateApiRouter = new Router({
    prefix: '/api'
});

loginApi(simulateApiRouter);

module.exports = simulateApiRouter.routes();
module.exports = function(router) {
	router.get('/login', function *(next) {
		this.body = "这是一个登录API";
	});
};
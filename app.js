 // 路由器 测试rote 指定内容返回
var koa = require('koa');  // 引入koa
var controller = require('koa-route');
var app = koa();  // 实例化
app.use(controller.get('/route_test' , function*() {   // 启动Koa中间件
	this.set('Cache-Control', 'no-cache');  
	this.body = "hello koa!";
}));

 // 测试 页面模板渲染
var views = require('co-views');
var render = views('./view', {
	map: {html: 'ejs'}
});
app.use(controller.get('/ejs_test', function*() {   
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('test' ,{title: 'title_test'});
}));

// 测试api 定义访问后端数据的接口
var service = require('./service/webAppService.js'); 
app.use(controller.get('/api_test', function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_test_data();
}));

// 静态资源文件目录的配置
var koa_static = require('koa-static-server');  
app.use(koa_static({
	rootDir: './static/',
	rootPath: '/static/',
	maxage: 0
}));


// 首页数据接口
app.use(controller.get('/ajax/index', function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_index_data();
}));

// 书架数据接口
app.use(controller.get('/ajax/bookbacket', function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_bookbacket_data();
}));

// 排行榜数据接口
app.use(controller.get('/ajax/rank', function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_rank_data();
}));

// 类别数据接口
app.use(controller.get('/ajax/category', function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_category_data();
}));

// 男频数据接口
app.use(controller.get('/ajax/male', function*() {
	this.set('Cache-Control','no-cache');
	this.body = service.get_male_data();
}));

// 女频数据接口
app.use(controller.get('/ajax/female', function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_female_data();
}));

// 书籍数据接口
app.use(controller.get('/ajax/book', function*() {
	this.set('Cache-Control', 'no-cache');
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	this.body = service.get_book_data(id);
}))

// 定义搜索接口
app.use(controller.get('/ajax/search', function*() {
	this.set('Cache-Control', 'no-cache');
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query); // http形式解析为object形式
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start, end, keyword);
}));


// 首页页面接口
app.use(controller.get('/', function*() {   
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('index' ,{title: '书城首页'});
}));

//  书籍详情页面接口
app.use(controller.get('/book', function*() {
	this.set('Cache-Control', 'no-cache');
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render('book', {bookId: bookId});
}));

// 书籍类别页面接口
app.use(controller.get('/category', function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('category', {title: '书籍类别页'});
}));

// 男生频道页面接口
app.use(controller.get('/male', function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('male', {title: '男生频道页'});
}));

// 女生频道页面接口
app.use(controller.get('/female', function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('female', {title: '女生频道页'});
}));

// 书籍排行榜页面接口
app.use(controller.get('/rank', function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('rank', {title: '书籍排行榜页'});
}));

// 搜索页面接口
app.use(controller.get('/search', function*() {
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('search', {title: '搜索'});
}));

app.listen(3000);
console.log('koa service is started')
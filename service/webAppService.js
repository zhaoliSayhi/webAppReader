var fs = require('fs');  // 引入fs模块
/*测试*/
// 读取模拟数据文件(mock下的test.json)，并返回出来
exports.get_test_data = function() {
	var content = fs.readFileSync('./mock/test.json', 'utf-8');
	return content;
}

// 读取首页数据
exports.get_index_data = function() {
	var content = fs.readFileSync('./mock/home.json', 'utf-8');
	return content;
}

// 读取书架数据
exports.get_bookbacket_data = function() {
	var content = fs.readFileSync('./mock/bookbacket.json', 'utf-8');
	return content;
}

// 读取排行榜数据
exports.get_rank_data = function() {
	var content = fs.readFileSync('./mock/rank.json', 'utf-8');
	return content;
}

// 读取类别数据
exports.get_category_data = function() {
	var content = fs.readFileSync('./mock/category.json', 'utf-8');
	return content;
}

// 读取男频数据
exports.get_male_data = function() {
	var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');
	return content;
}

// 读取女频数据
exports.get_female_data = function() {
	var content = fs.readFileSync('./mock/channel/female.json', 'utf-8');
	return content;
}

// 读取书籍数据
exports.get_book_data = function(id) {
	if (!id) {
		id = 18218;
	}
	var content = fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
	return content;
}





// 搜索真实http格式的接口
exports.get_search_data = function(start, end, keyword) {
	// http模块是异步的不能直接返回，所以返回一个异步函数(当执行回调的时候才能返回数据)
	return function(callback) {    
		// http模块，用来发送请求  node的npm中自带模块
		var http = require('http');  
		 // querystring这个模块会把object对象转换成http形式的查询参数
		var qs = require('querystring');  // {a: '1'} -> http://127.0.0.1/api?a=1
		// 查询的关键词
		var data = {  
			s: keyword,
			start: start,
			end: end
		};
		var content = qs.stringify(data);
		// http 请求的一些参数
		var http_request =  {
			hostname: 'dushu.xiaomi.com',  // 主机地址
			port: 90,
			path: '/store/v0/lib/query/onebox?' + content,  // 路由地址
			method: 'GET'
		}
		req_obj = http.request(http_request, function(_res) {
			var content = '';
			_res.setEncoding('utf8');
			_res.on('data', function(chunk) {
				content += chunk;
			});
			_res.on(end, function() {
				callback(null, content);
			})
		});

		// 监听error事件
 		req_obj.on('error', function() {

		})

		// 发送请求
		req_obj.end();
	}
}
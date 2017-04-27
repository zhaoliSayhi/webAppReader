var id = location.href.split('?id').pop();
$.get('/ajax/book?id' + id, function(data) {
	new Vue({
		el : '#app',
		data: data,
		methods: {
			readBook: function() {
				location.href = '/reader'
			}
		}
	})
}, 'json')
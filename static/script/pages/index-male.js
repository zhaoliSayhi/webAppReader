$.get('/ajax/male', function (data) {

	new Vue ({
		el: '#app',
		data: {
			attention: data.items[0].data.data,
			recommend: data.items[1].data.data,
			newBook: data.items[2].data.data,
			finshed: data.items[3].data.data
		},		
	})
}, 'json')
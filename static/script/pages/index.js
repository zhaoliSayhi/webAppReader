$.get('/ajax/index', function(data) {
	var winWidth = $(document).width();
	if (winWidth < 320) {
		winWidth = 320;
	}
	var offset = $($('.Swipe-tab').find('a')[0]).offset();
	index_header_tab_width = offset.width;

	new Vue({
		el: '#app',
		data: {
			top: data.items[0].data.data,
			hot: data.items[1].data.data,
			recommend: data.items[2].data.data,
			male: data.items[3].data.data,
			female: data.items[4].data.data,
			free: data.items[5].data.data,
			toptic: data.items[6].data.data,

			position: 0,
			header_position: 0,
			duration: 0,
			header_duration: 0,
			tab1_class: 'Swipe-tab__on',
			tab2_class: '',

			screen_width: winWidth,
			double_screen_width: winWidth*2,
			index_header_tab_width: index_header_tab_width,
		},
		methods: {
			tabSwitch: function(pos) {
				this.duration = 0.5;
				this.header_duration = 0.5;
				if (pos == 0) {
					this.position = 0;
					this.header_position = 0;
					this.tab1_class = "Swipe-tab__on";
					this.tab2_class = "";
				} else {
					this.position = (-winWidth);
					this.header_position = index_header_tab_width;
					this.tab1_class = "";
					this.tab2_class = "Swipe-tab__on";
				}
			}
		}
	})
}, 'json')
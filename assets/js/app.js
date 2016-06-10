var vm = new Vue({
	el: '#status',
	data: {
		monitors: [],
		statusText: {
			1: "Carregando...",
			2: "Online",
			9: "Offline"
		},
		showServers: false
	},
	methods: {
		ajax: function(url, data, success) {
			this.$http.get(url, data).success(success);
		},
		load: function() {
			for (var i = 0; i < this.monitors.length; i++) {
				this.ajax('https://api.uptimerobot.com/getMonitors', { apiKey: this.monitors[i].monitorAPI, format: 'json', noJsonCallback: 1 }, (function(index) {
					return function(response) {
						var m = this.monitors[index],
							r = response.monitors.monitor[0];
						m.status = r.status;
						m.address = r.url;
						this.showServers = true;
					};
				})(i)); //This takes the For scope variable 'i' to be inherit by the anonymous function as 'index'
			}
		}
	},
	ready: function() {
		this.ajax('monitors.json', {}, function(response) {
			this.$set('monitors', response);
			this.load();
		});
	}
});
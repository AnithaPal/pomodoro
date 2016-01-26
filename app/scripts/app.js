(function(){
	function config($stateProvider, $locationProvider){
		$locationProvider
			.html5Mode({
			enabled: true,
			requireBase: false
		});
		$stateProvider
			.state('taskTimer', {
				url: '/',
				controller: 'TaskTimerCtrl as taskTimer',
				templateUrl: 'templates/task_timer.html'	
			});
			
		
	}
	
	angular
		.module('pomodoro', ['ui.router'])
		.config(config);	
})();
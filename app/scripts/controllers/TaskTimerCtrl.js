(function(){
	function TaskTimerCtrl(){
		this.totalTime = 1500;
		this.breakTime = 300;
	};
	
	angular
		.module('pomodoro')
		.controller('TaskTimerCtrl', [TaskTimerCtrl])
	
})();



(function(){
	function TaskTimerCtrl(){
		this.totalTime = 20;
		this.breakTime = 10;
		this.longBreakTime = 30;
	};
	
	angular
		.module('pomodoro')
		.controller('TaskTimerCtrl', [TaskTimerCtrl])
	
})();



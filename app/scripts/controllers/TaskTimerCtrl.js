(function(){
	function TaskTimerCtrl(){
		this.totalTime = 5;
		this.breakTime = 6;
		this.longBreakTime = 10;
	};
	
	angular
		.module('pomodoro')
		.controller('TaskTimerCtrl', [TaskTimerCtrl])
	
})();



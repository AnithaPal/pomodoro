(function(){
	function TaskTimerCtrl(){
		this.taskTime = 1500;
		this.breakTime = 300;
		this.longBreakTime = 1800;
	};
	
	angular
		.module('pomodoro')
		.controller('TaskTimerCtrl', [TaskTimerCtrl])
	
})();



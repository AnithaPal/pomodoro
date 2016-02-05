(function(){
	function TaskTimerCtrl(TaskService, $scope){

		this.taskTime = 1500;
		this.breakTime = 300;
		this.longBreakTime = 1800;

		this.tasks = TaskService.all();
		console.log(this.tasks);

		this.addTask = function(task) {

			TaskService.create(task);
			$scope.taskName = null;
		};

		this.deleteTask = function(task) {
			TaskService.delete(task);
		}
	};



	angular
		.module('pomodoro')
		.controller('TaskTimerCtrl', ['TaskService', '$scope',TaskTimerCtrl])

})();

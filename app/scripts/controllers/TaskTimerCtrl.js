(function(){
	function TaskTimerCtrl(TaskService, $scope){

		this.taskTime = 1500;
		this.breakTime = 300;
		this.longBreakTime = 1800;

		this.tasks = TaskService.bind();
		TaskService.bindLastTaskToValue(this, 'currentTask');
		
		this.addTask = function(task) {
			TaskService.create(task);
		};

		this.deleteTask = function(task) {
			TaskService.delete(task);
		}
		
//		this.updateTask = function(task){
//			TaskService.$save(task);
//		}
		
		this.setAsCurrent = function(task){
			this.currentTask = task;
		};
	};

	angular
		.module('pomodoro')
		.controller('TaskTimerCtrl', ['TaskService', '$scope', TaskTimerCtrl])

})();

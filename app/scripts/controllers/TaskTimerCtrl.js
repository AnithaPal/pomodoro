(function(){
	function TaskTimerCtrl(TaskService, $scope){

		this.taskTime = 1500;
		this.breakTime = 300;
		this.longBreakTime = 1800;

		this.tasks = TaskService.all();

		// sets created task as a default task
		this.getLastTask = function() {
			TaskService.getLastAdded(function (snapshot) {
				snapshot.forEach(function (task) {
					$scope.currentTask = task.val();
				});
			});
		};
		
		this.currentTask = $scope.currentTask;
		
		this.addTask = function(task) {
			TaskService.create(task);
			$scope.task = null;
			this.getLastTask();
		};

		this.deleteTask = function(task) {
			TaskService.delete(task);
		}
		
		this.updateTask = function(task){
			TaskService.update(task);
		}
		this.setAsCurrent = function(task){
			this.currentTask = task;
			console.log('I am from setAsCurrent' + this.currentTask.name);
		};
	};

	angular
		.module('pomodoro')
		.controller('TaskTimerCtrl', ['TaskService', '$scope', TaskTimerCtrl])

})();

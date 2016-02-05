(function(){
	function TaskTimerCtrl(TaskService, $scope){

		this.taskTime = 1500;
		this.breakTime = 300;
		this.longBreakTime = 1800;

		this.tasks = TaskService.all();
		console.log(this.tasks);


		// sets created task as a default task
		TaskService.getLastAdded(function (snapshot) {
      snapshot.forEach(function (task) {
        $scope.lastAddedTask = task.val().name;
				// console.log($scope.lastAddedTask);
      });
    });

 console.log($scope.lastAddedTask);



		this.addTask = function(task) {
			TaskService.create(task);
			$scope.task = null;
		};

		this.deleteTask = function(task) {
			TaskService.delete(task);
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

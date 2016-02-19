(function(){
	function TaskTimerCtrl(TaskService, $scope){
		var ctrl = this;

		ctrl.taskTime = 1500;
		ctrl.breakTime = 300;
		ctrl.longBreakTime = 1800;

		ctrl.tasks = TaskService.bind();

		var setCurrentToLast = function() {
			TaskService.bindLastTaskToValue(function(key, task) {
				ctrl.currentTask = task;
				ctrl.currentTask.$id = key;
			});
		}

		ctrl.tasks.$loaded().then(function(x) {
			setCurrentToLast();
  	})

		ctrl.addTask = function(task) {
			task.interruptions = 0;
			TaskService.create(task, ctrl);
			setCurrentToLast();
		};

		ctrl.deleteTask = function(task) {
			TaskService.delete(task);
			setCurrentToLast();
		}

		ctrl.setAsCurrent = function(task){
			console.log(task);
			ctrl.currentTask = task;
		};

		ctrl.addInterruption = function(){
			ctrl.currentTask.interruptions++;
			TaskService.update(ctrl.currentTask,'interruptions', ctrl.currentTask.interruptions);
		};
	};

	angular
		.module('pomodoro')
		.controller('TaskTimerCtrl', ['TaskService', '$scope', TaskTimerCtrl])

})();

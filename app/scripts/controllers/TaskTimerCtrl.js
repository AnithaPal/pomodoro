(function(){
	function TaskTimerCtrl(TaskService, $scope){
		var ctrl = this;
		
		ctrl.taskTime = 1500;
		ctrl.breakTime = 300;
		ctrl.longBreakTime = 1800;

		ctrl.tasks = TaskService.bind();
		
		ctrl.tasks.$loaded().then(function(x) {
			TaskService.bindLastTaskToValue(ctrl, 'currentTask');
  	})
		
		ctrl.tasks.$watch(function(event) {
			console.log(event);
			if (event === "child_added" || event === "child_changed") {
  			TaskService.bindLastTaskToValue(ctrl, 'currentTask');
			}
		});
		
		ctrl.addTask = function(task) {
			task.interruptions = 0;
			TaskService.create(task, ctrl);
		};

		ctrl.deleteTask = function(task) {
			TaskService.delete(task);
		}
		
		ctrl.setAsCurrent = function(task){
			ctrl.currentTask = task;
		};
		
		ctrl.addInterruption = function(){
			value = ctrl.currentTask.interruptions + 1;
			TaskService.update(ctrl.currentTask, 'interruptions', value);
		};
	};

	angular
		.module('pomodoro')
		.controller('TaskTimerCtrl', ['TaskService', '$scope', TaskTimerCtrl])

})();

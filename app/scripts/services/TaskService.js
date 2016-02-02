(function(){
	function TaskService($firebaseArray){
		var TaskService = {};
		
		var firebaseref = new Firebase("https://pomodoro-tasktimer.firebaseio.com/");
		var taskList = $firebaseArray(firebaseref);
		
		TaskService.create = function(taskName){
			taskList.$add({ taskName: taskName });
		};
					  
		TaskService.delete = function(taskID){
			taskList.$remove(taskID);
		};
		
		TaskService.all = function() {
			return taskList;
		};
		
		return TaskService;
	}
	
	angular
	.module("pomodoro")
	.factory('TaskService', ['$firebaseArray', TaskService]);
	
})();
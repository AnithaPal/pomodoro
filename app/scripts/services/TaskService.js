(function(){
	function TaskService($firebaseArray){
		var TaskService = {};
		var tasksRef = new Firebase("https://pomodoro-tasktimer.firebaseio.com/tasks");
		var tasks = $firebaseArray(tasksRef);

		TaskService.create = function(task){
			tasks.$add({ name: task.name,
											sessionQty: task.sessionQty,
										  created_at: Firebase.ServerValue.TIMESTAMP,
											interruptionQty: task.interruptionQty }	)	};

		TaskService.delete = function(task){
			tasks.$remove(task);
		};

		TaskService.bindLastTaskToValue = function(ctrl, value) {
			tasksRef.orderByChild("createdAt").limitToLast(1).on("value", function (snap) {
				snap.forEach(function (task) {
					ctrl[value] = task.val();
				});
			});
		};

		TaskService.bind = function() {
			return tasks;
		};
		
		return TaskService;
	}

	angular
		.module("pomodoro")
		.factory('TaskService', ['$firebaseArray', TaskService]);

})();
(function(){
	function TaskService($firebaseArray){
		var TaskService = {};
		var tasksRef = new Firebase("https://pomodoro-tasktimer.firebaseio.com/tasks");
		var tasks = $firebaseArray(tasksRef);

		TaskService.create = function(task, ctrl){
			tasks.$add({ name: task.name,
											sessionQty: task.sessionQty,
										  created_at: Firebase.ServerValue.TIMESTAMP,
											interruptions: task.interruptions });
		};

		TaskService.delete = function(task){
			tasks.$remove(task);
		};

		TaskService.bindLastTaskToValue = function(callback) {
			tasksRef.orderByChild("createdAt").limitToLast(1).once("value", function (snap) {
				snap.forEach(function (task) {
					callback(task.key(), task.val());
				});
			});
		};

		TaskService.getTask = function(key) {
			var i = tasks.$indexFor(key);
			return tasks.$getRecord(i);
		}

		TaskService.update = function(task, attribute, value) {
			var i = tasks.$indexFor(task.$id);
			tasks[i][attribute] = value;

			tasks.$save(i);
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

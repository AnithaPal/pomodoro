(function(){
	function TaskService($firebaseArray){
		var TaskService = {};
		var firebaseref = new Firebase("https://pomodoro-tasktimer.firebaseio.com/");
		var taskList = $firebaseArray(firebaseref);

		TaskService.create = function(task){
			taskList.$add({ name: task.name,
											sessionQty: task.sessionQty,
										  created_at: Firebase.ServerValue.TIMESTAMP});
		};

		TaskService.delete = function(taskID){
			taskList.$remove(taskID);
		};

		TaskService.getLastAdded = function (callback) {
        firebaseref.orderByChild("name").limitToLast(1).on("value", callback);
      }

		TaskService.all = function() {
			return taskList;
		};

		// TaskService.setLast = function(){
		//
		// 	firebaseref.orderByChild("id").limitToLast(1).on("value", function (snapshot) {
		// 		$scope.last = snapshot.val();
		// 	})
		//
		// }




		return TaskService;
	}

	angular
	.module("pomodoro")
	.factory('TaskService', ['$firebaseArray', TaskService]);

})();


//  TaskService.addWorkSession = function(task, workSession){
// 	var index = taskList.$indexOf( task.$id );
// 	console.log(index);
// 	var item = taskList[task.$id]
// 	item.no_worksession = workSession;
// 	taskList.$set(item.$id, item);
// 	// task.update({no_worksession: workSession})
// };

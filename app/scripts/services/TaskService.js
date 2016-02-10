(function(){
	function TaskService($firebaseObject){
		var TaskService = {};
		var firebaseref = new Firebase("https://pomodoro-tasktimer.firebaseio.com/");
		var tasksRef = firebaseref.child("tasks");
		var taskList = $firebaseObject(tasksRef);

		TaskService.create = function(task){
			tasksRef.push({ name: task.name,
											sessionQty: task.sessionQty,
										  created_at: Firebase.ServerValue.TIMESTAMP,
											interruptionQty: task.interruptionQty });
			
		};

		TaskService.delete = function(task){
			console.log(task.name);
			tasksRef.orderByChild("name").equalTo(task.name).once("value", function(snapshot) {
				tasksRef.child(Object.keys(snapshot.val())[0]).remove();
			})
		};
		
		TaskService.update = function(taskID){
			var item = taskList.$getRecord(taskID);
				item.name = task.name;
				item.sessionQty = task.sessionQty;
				item.interruptionQty = task.interruptionQty;
				taskList.$save(item);
				
		}

		TaskService.getLastAdded = function (callback) {
			tasksRef.orderByChild("createdAt").limitToLast(1).on("value", callback);
		};

		TaskService.all = function() {
			return taskList;
		};

		
		return TaskService;
	}

	angular
	.module("pomodoro")
	.factory('TaskService', ['$firebaseObject', TaskService]);

})();


//  TaskService.addWorkSession = function(task, workSession){
// 	var index = taskList.$indexOf( task.$id );
// 	console.log(index);
// 	var item = taskList[task.$id]
// 	item.no_worksession = workSession;
// 	taskList.$set(item.$id, item);
// 	// task.update({no_worksession: workSession})
// };


//TaskService.sync = function(ctrl) {
//			tasksRef.orderByChild("createdAt").on("value", function(snap) {
//				ctrl.tasks = snap.val().reverse();
//			});
//		};
(function(){
	function timer($interval){
	
		return {
			 templateUrl: '/templates/directives/timer.html',
			 replace: true,
			 restrict: 'E',
			 scope: {
			 },
			 link: function(scope, element, attributes){
				/**
 					* @desc to store instance of $interval service for timer
 					* @type {Object}
 				*/
				var interval;
				 
				 /**
 					* @desc to store counter value
 					* @type {Object}
 				*/ 
				 var workSessionCounter = 0;
				 
				 /**
					 * @function reset
					 * @desc resets the timer
 				*/
				 var stop = function(){
					 $interval.cancel(interval);
				 }
				 
				 var configBreak = function() {
					scope.onTask = false;
					 
					workSessionCounter += 1

					if (workSessionCounter === 2){
						scope.onLongBreak = true;
					} else {
						scope.onBreak = true;
					}
					 
				    scope.isTimerActive = false;
					scope.currentTime = attributes.totaltime;

				};
				 
				 var configTask = function() {
					scope.onBreak = false;
					scope.onTask = true;
					 
					scope.isTimerActive = false;
					scope.currentBreakTime = attributes.breaktime;
				};
				 
				 var configReset = function() {
					scope.onLongBreak = false;
					scope.onTask = true;

					workSessionCounter = 0;
					 
					scope.isTimerActive = false;
					scope.longBreakTime = attributes.longbreaktime;
				};
				 
				 
				/**
					 * @function decrementTime
					 * @desc decrement currentTime after 1000ms from $interval service
				*/
				var decrementTime = function(){
					if(scope.currentTime > 0){
						scope.currentTime -= 1;
					}else {
						configBreak();
						stop();
					}
				};
				 
				 /**
					 * @function decrementBreakTime
					 * @desc decrement currentBreakTime after 1000ms from $interval service
				*/
				 var decrementBreakTime = function(){
					if(scope.currentBreakTime > 0){
						scope.currentBreakTime -= 1;
					} else {
						configTask();
						stop();
		
					}
				};
				 
				 /**
					 * @function decrementLongBreakTime
					 * @desc decrement LongBreakTime after 1000ms from $interval service
				*/
				 var decrementLongBreakTime = function(){
					if(scope.longBreakTime > 0){
						scope.longBreakTime -= 1;
					}
					else {
						configReset();
						stop();
					}
				};
			
				/**
 					* @desc to store current time.
 					* @type {Object}
 				*/
				scope.currentTime = attributes.totaltime;
				scope.currentBreakTime = attributes.breaktime;
				scope.longBreakTime = attributes.longbreaktime;
				 
				 
				 scope.onTask = true;
				 scope.onBreak = false;
				 scope.onLongBreak = false;
				 

				scope.isTimerActive = false;
				 

				scope.start = function(){
					scope.isTimerActive = true;
					interval = $interval(decrementTime, 1000);
				};
				 
				scope.startBreak = function(){
					scope.isTimerActive = true;
					interval = $interval(decrementBreakTime, 1000);
				};
				
				scope.startLongBreak = function(){
					scope.isTimerActive = true;
					interval = $interval(decrementLongBreakTime, 1000);
				};
				 
				 
				 /**
					 * @function reset
					 * @desc resets the timer
 				*/
				 scope.taskReset = function(){
					 stop();
					 scope.currentTime = attributes.totaltime;
					 scope.start();
				 }
				 
				 
				 /**
					 * @function breakstop
					 * @desc stops the break timer
 				*/
				 scope.breakReset = function(){
					  stop();
					  scope.currentBreakTime = attributes.breaktime;
					  scope.startBreak();
	
				 }
				 
				 
				 /**
					 * @function longBreakReset
					 * @desc resets the long break timer
 				*/
				 
				 scope.longBreakReset = function(){
					 stop();
					 scope.longBreakTime = attributes.longbreaktime;
					 scope.startLongBreak();
				 }
					 
				 	 
			}	
 		};
		
	}

	angular
		.module('pomodoro')
		.directive('timer', ['$interval', timer]);
	
})();
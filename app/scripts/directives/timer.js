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
 					* @desc to store instance of $interval service for break
 					* @type {Object}
 				*/
				var breakInterval; 
			
				 /**
 					* @desc to store counter value
 					* @type {Object}
 				*/ 
				 var counter = 0;
				 
				 
				 /**
					 * @function reset
					 * @desc resets the timer
 				*/
				 var stop = function(){
					 $interval.cancel(interval);
					 scope.currentTime = attributes.totaltime;
					 counter = 0
					 scope.isTimerActive = false; 
				 }
				 
				 /**
					 * @function reset
					 * @desc resets the timer
 				*/
				 var breakStop = function(){
					 $interval.cancel(breakInterval);
					 scope.currentBreakTime = attributes.breaktime;
					 counter = 0
					 scope.isBreakActive = false;
				 }
				 
				/**
					 * @function decrementTime
					 * @desc decrement currentTime after 1000ms from $interval service
				*/
				var decrementTime = function(){
					if(scope.currentTime > 0){
						counter +=1;
						scope.currentTime -= 1;
						if(counter === 1500){
							scope.onBreak = true;
							scope.isBreakActive = false;
						} 
					}else {
						scope.stop();
					}
				};
				 
				 /**
					 * @function decrementBreakTime
					 * @desc decrement currentBreakTime after 1000ms from $interval service
				*/
				 var decrementBreakTime = function(){
					if(scope.currentBreakTime > 0){
						counter +=1;
						scope.currentBreakTime -= 1;
						if(counter === 300){
							scope.onBreak = false;
							breakStop();	
						} 
					}
					else {
						scope.breakStop();
						scope.isTimerActive = false;
					}
				};
				 
//				attributes.$observe('totaltime', function(totalTime) {
//					
//				});
				
			
				/**
 					* @desc to store current time.
 					* @type {Object}
 				*/
				scope.currentTime = attributes.totaltime;
				 
				/**
 					* @desc to store break time.
 					* @type {Object}
 				*/
				scope.currentBreakTime = attributes.breaktime;
				
				 
				 /**
 					* @desc to store status of a timer wheather to display  start or reset button.
 					* @type {Object}
 				*/
				scope.isTimerActive = false;
				 
				 /**
 					* @desc to store status of break session 
 					* @type {Object}
 				*/
				 scope.onBreak = false;
				 
				 
				  /**
 					* @desc to store status of a break time wheather to display break or reset button.
 					* @type {Object}
 				*/
				scope.isBreakActive = false;
				 
				 
				 /**
					 * @function start
					 * @desc starts the timer 
 				*/
				scope.start = function(){
					scope.isTimerActive = true; 
					interval = $interval(decrementTime, 1000);
					
				};
				 
				 
				 /**
					 * @function reset
					 * @desc resets the timer
 				*/
				 scope.reset = function(){
					 stop();
					 scope.start();
				 }
				 
				 /**
					 * @function break
					 * @desc timer for breaks
 				*/ 
				 scope.break = function(){
					 stop();
					 scope.onBreak = true;
					 scope.isBreakActive = true;
					 breakInterval = $interval(decrementBreakTime, 1000);
					
				 }
				 
				 /**
					 * @function breakstop
					 * @desc stops the break timer
 				*/
				 scope.breakReset = function(){
					  breakStop();
					  scope.break();
	
				 }
				 	 
			}	
 		};
		
	}

	angular
		.module('pomodoro')
		.directive('timer', ['$interval', timer]);
	
})();
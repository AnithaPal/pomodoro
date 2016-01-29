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
					 * @function long break reset
					 * @desc resets the timer
 				*/
				 var longBreakStop = function(){
					$interval.cancel(longBreakInterval);
					 scope.longBreakTime = attributes.longbreaktime;
					 console.log("from longbreakstop " + scope.longBreakTime);
					 counter = 0
					 scope.isLongBreakActive = false;
				 }
				 
				 
				/**
					 * @function decrementTime
					 * @desc decrement currentTime after 1000ms from $interval service
				*/
				var decrementTime = function(){
					if(scope.currentTime > 0){
						counter +=1;
						console.log('Timer counter:' + counter);
						scope.currentTime -= 1;
						if(counter === 20){
							scope.onBreak = true;
							scope.isBreakActive = false;
							workSessionCounter += 1
							console.log("worksession counter: " + workSessionCounter);
							if (workSessionCounter === 4){
								scope.onLongBreak = true;
								scope.onBreak = false;
								scope.onTask = false;
							}
						} 
					}else {
						stop();
					}
				};
				 
				 /**
					 * @function decrementBreakTime
					 * @desc decrement currentBreakTime after 1000ms from $interval service
				*/
				 var decrementBreakTime = function(){
					if(scope.currentBreakTime > 0){
						counter +=1;
						console.log('Break counter:' + counter);
						scope.currentBreakTime -= 1;
						if(counter === 10){
							scope.onBreak = false;
							console.log('on break status' + scope.onBreak);
							scope.isTimerActive = false;
							breakStop();	
						} 
					}
					else {
						scope.onBreak = false;
						scope.isTimerActive = false;
						breakStop();
		
					}
				};
				 
				 /**
					 * @function decrementLongBreakTime
					 * @desc decrement LongBreakTime after 1000ms from $interval service
				*/
				 var decrementLongBreakTime = function(){
					if(scope.longBreakTime > 0){
						counter +=1;
						console.log('Long Break counter:' + counter);
						scope.longBreakTime -= 1;
						if(counter === 30 ){
							scope.onLongBreak = false;
							longBreakStop();
							workSessionCounter = 0;
							scope.onBreak = false;
							scope.onTask = true;	
						} 
					}
					else {
						longBreakStop();
						scope.onLongBreak = true;
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
 					* @desc to store long break time.
 					* @type {Object}
 				*/
				scope.longBreakTime = attributes.longbreaktime;
				 
				 
				 /**
 					* @desc to store status of a timer wheather to display timer, break, or long break.
 					* @type {Object}
 				*/
				 scope.onTask = true;
				 
				 
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
 					* @desc to store status of a long break button.
 					* @type {Object}
 				*/
				scope.onLongBreak = false;
				 
				scope.isLongBreakActive = false; 
				 
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
				 
				 /**
					 * @function longBreak
					 * @desc stops the break timer
 				*/
				 
				 scope.longBreak = function(){
					 stop();
					 breakStop();
					 scope.isLongBreakActive = true; 
					 longBreakInterval = $interval(decrementLongBreakTime, 1000);
					 
				 }
				 
				 
				 
				 /**
					 * @function longBreakReset
					 * @desc resets the long break timer
 				*/
				 
				 scope.longBreakReset = function(){
					 longBreakStop();
					 scope.longBreak();
					 
				 }
					 
				 	 
			}	
 		};
		
	}

	angular
		.module('pomodoro')
		.directive('timer', ['$interval', timer]);
	
})();
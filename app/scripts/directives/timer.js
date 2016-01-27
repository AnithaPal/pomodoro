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
					 * @function decrementTime
					 * @desc decrement currentTime after 1000ms from $interval service
				*/
				var decrementTime = function(){
					if(scope.currentTime > 0){
						counter +=1;
						console.log("current time counter: "+ counter);
						scope.currentTime -= 1;
						if(counter === 1500){
							scope.onBreak = true;
							scope.stop();
						} 
					}else {
						scope.stop();
					}
				};
				 
				 var decrementBreakTime = function(){
					if(scope.currentBreakTime > 0){
						console.log
						counter +=1;
						console.log('break time counter : ' + counter);
						scope.currentBreakTime -= 1;
						if(counter === 300){
							scope.isTimerActive = false;
							counter = 0;
							scope.breakStop();	
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
 					* @desc to store status of break button 
 					* @type {Object}
 				*/
				 scope.onBreak = false;
				 
				 /**
					 * @function start
					 * @desc starts the timer 

 				*/
				scope.start = function(){
					scope.isTimerActive = true; 
					interval = $interval(decrementTime, 1000);
					
				};
				 
				 /**
					 * @function stop
					 * @desc stops the timer
 				*/
				 scope.stop = function(){
					 $interval.cancel(interval);
					 scope.currentTime = attributes.totaltime;
					 scope.isTimerActive = false; 
				 }
				 
				 /**
					 * @function reset
					 * @desc resets the timer
 				*/
				 scope.reset = function(){
					 scope.currentTime = attributes.totaltime;
				 
				 }
				 
				 /**
					 * @function break
					 * @desc timer for breaks
 				*/
				 
				 scope.break = function(){
					 scope.stop();
					 counter = 0;
					 breakInterval = $interval(decrementBreakTime, 1000);
					 
				 }
				 
				 /**
					 * @function breakstop
					 * @desc stops the timer
 				*/
				 scope.breakStop = function(){
					  $interval.cancel(breakInterval);
					  scope.currentBreakTime = attributes.breaktime;
					  scope.onBreak = false;
				 }
				
			}	
 		};
		
	}
	
	
	angular
		.module('pomodoro')
		.directive('timer', ['$interval', timer]);
	
})();
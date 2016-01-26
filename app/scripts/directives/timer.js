(function(){
	function timer($interval){
	
		return {
			 templateUrl: '/templates/directives/timer.html',
			 replace: true,
			 restrict: 'E',
			 scope: {},
			 link: function(scope, element, attributes){
				 
				/**
 					* @desc to store instance of $interval service
 					* @type {Object}
 				*/
				var interval;
				/**
					 * @function decrementTime
					 * @desc decrement currentTime after 1000ms from $interval service
				*/
				var decrementTime = function(){
					if(scope.currentTime > 0){
					scope.currentTime -= 1;
					}
					else{
						scope.stop();
					}
				};
				 
				/**
 					* @desc to store current time.
 					* @type {Object}
 				*/
				scope.currentTime = 1500;
				 
				 /**
 					* @desc to store status of a button
 					* @type {Object}
 				*/
				scope.isActive = false;
				 
				 /**
					 * @function start
					 * @desc starts the timer 

 				*/
				scope.start = function(){
					scope.isActive = true; 
					interval = $interval(decrementTime, 1000);
					
				};
				 
				 /**
					 * @function stop
					 * @desc stops the timer
 				*/
				 scope.stop = function(){
					 $interval.cancel(interval);
					 scope.currentTime = 1500;
					 scope.isActive = false; 
				 }
				 
				 /**
					 * @function reset
					 * @desc resets the timer
 				*/
				 scope.reset = function(){
					 scope.currentTime = 1500;
				 
				 }
				
			}	
 		};
		
	}
	
	
	angular
		.module('pomodoro')
		.directive('timer', ['$interval', timer]);
	
})();
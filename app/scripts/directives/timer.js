(function(){
	function timer($interval, $rootScope){
	
		return {
			 templateUrl: '/templates/directives/timer.html',
			 replace: true,
			 restrict: 'E',
			 scope: {
			 },
			 link: function(scope, element, attributes){
				
				var interval;
				  
				var workSessionCounter = 0;
				
				var mySound = new buzz.sound('/assets/music/ding.mp3',{
					preload: true
				});
				 
				var playDing = function(){
					mySound.play();
				} 
				

				var stop = function(){
					 $interval.cancel(interval);
				 };
				 
				 var configBreak = function() {
					scope.onTask = false;
					 
					workSessionCounter += 1
					
					if (workSessionCounter >= 4){
						scope.onLongBreak = true;
						scope.currentTime = attributes.longbreaktime;
						workSessionCounter = 0;
					} else {
						scope.onBreak = true;
						scope.currentTime = attributes.breaktime;

					}
					 
				    scope.isTimerActive = false;

				};
				 
				 var configTask = function() {
					scope.onBreak = false;
					scope.onLongBreak = false;
					scope.onTask = true; 
					scope.isTimerActive = false;
					scope.currentTime = attributes.tasktime;
				};
				 
				 
				var decrementTime = function(){
					if(scope.currentTime > 0){
						scope.currentTime -= 1;
					}else {
						$rootScope.$watch(function(){
							return scope.onTask;
						}, function(newValue, oldValue) {
							if(newValue){
								playDing();
							}
							
				 		});
						configBreak();
						stop();
					}
				};
				 

				 var decrementBreakTime = function(){
					if(scope.currentTime > 0){
						scope.currentTime -= 1;
					} else {
						$rootScope.$watch(function(){
							return scope.onBreak;
						}, function(newValue, oldValue) {
							if(newValue){
								playDing();
							}
				 		});
						configTask();
						stop();
		
					}
				};
				 
				var setCurrentTime = function() {
					if (scope.onTask) {
						scope.currentTime = attributes.tasktime;
					} 
					else if (scope.onBreak) {
						 scope.currentTime = attributes.breaktime;
					} else {
						 scope.currentTime = attributes.longbreaktime;
					}
				}; 
				 

				scope.currentTime = attributes.tasktime;
				scope.onTask = true;
				scope.onBreak = false;
				scope.onLongBreak = false;
				scope.isTimerActive = false;
				 

				scope.startTask = function(){
					scope.isTimerActive = true;
					interval = $interval(decrementTime, 1000);
				};
				 
				scope.startBreak = function(){
					scope.isTimerActive = true;
					interval = $interval(decrementBreakTime, 1000);
				};

				
				scope.resetTask = function(){
					 stop();
					 setCurrentTime();
					 scope.startTask();
				};
				 

				scope.resetBreak = function(){
					  stop();
					  setCurrentTime();
					  scope.startBreak();
				 };	
				
			}	
 		};
		
	}

	angular
		.module('pomodoro')
		.directive('timer', ['$interval','$rootScope', timer]);
	
})();
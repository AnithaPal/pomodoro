(function() {
     function timecode() {
		 var output ='';
         return function(seconds) {
		     
			 var minutes = Math.floor(seconds/ 60);
			 var remaining_seconds = seconds % 60;
			 
			 output = minutes + ":";
			 
			 if(remaining_seconds < 10){
				 output += '0';
			 }
				 
			 output += remaining_seconds;
             return output;
         };
     }
 
     angular
         .module('pomodoro')
         .filter('timecode', timecode);
 })();
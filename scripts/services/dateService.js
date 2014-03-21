/**
 * Created by ben.nelson on 2/14/14.
 */
ticketpicker.service("$dateService", function(){
	this.validateDate = function(date){
		var pattern = /^[0-9]*$/
		if(pattern.test(date))
			return false;

		if(date == null || !isNaN(Date.parse(date)))
			return true;

	  return false;
	}
});
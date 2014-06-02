/**
 * Created by ben.nelson on 2/14/14.
 */
ticketpicker.service("$dateService", function(){
	this.validateDate = function(date){
		if(date == " " || date == undefined || date == null || date == "")
		  return true; 

		var correctFormat = /^[0-9]+\/[0-9]+\/[0-9][0-9]*$/	
		if(!correctFormat.test(date) && date != null)
			return false; 

		if(date == null || !isNaN(Date.parse(date)))
			return true;

	  return false;
	}
});
//random user picking algorithm based on spec

ticketpicker.service("$randomPicker", function(){
		this.select = function(list, nonwinning){
			if(list.length == 0)
				return;
			
			if(list.length == 1)
				return list[0];

			var nonwinners = [];
			if(!nonwinning)
			{
				nonwinners = list.filter(function(item){
					return item.lastWin == ' ' || item.lastWin == null || item.lastWin == '';
				});
			}
			else{
				return list[Math.floor((Math.random() * list.length) + 1)];
			}

			if(nonwinners.length > 0)
				return this.select(nonwinners, true);

			var smallest_winner = { lastWin: moment() };
			list.forEach(function(item){
				if(moment(new Date(item.lastWin)).isBefore(smallest_winner.lastWin))
					smallest_winner = item;
			});

			return smallest_winner;
		}
});
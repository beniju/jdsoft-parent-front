
	var hasInputs = function(){
		var $targets = $('input, textarea').not(".placeholder-ok");
		if($targets.length > 0 ){
			$targets.placeholder();
			$targets.addClass("placeholder-ok")
		}
	}

	setInterval(function(){
		hasInputs();
	}, 1000);
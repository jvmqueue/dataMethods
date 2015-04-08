require(['amdUtil'], function(util){
	var w = window, d = document, $ = jQuery;
	var lclHash = {
		blue:0,
		red:1,
		green:2
	};


	util.causeFocus('txtValuesForArray');
	



	util.setListener({$node:$('#btnPopulateArray'), event:'click', data:{'textNode':d.getElementById('txtValuesForArray')}, listener:util.populateLclArrayFromString});     
	util.setListener({$node:$('#btnPrintRevisedArray'), event:'click', data:{'textNode':d.getElementById('txtRemoveArrayElementAt')}, listener:util.removeElementAt});

//	util.populateLclArrayFromString('zero, one, two, three, four');
	util.populateLclArrayFromHash(lclHash);

	
	var lclArray = util.getLclArray();
	


	
	
	// TODO: print revised array values



});
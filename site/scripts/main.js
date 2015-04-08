require(['amdUtil'], function(util){
	
	var w = window, d = document, $ = jQuery;

	util.fnc.causeFocus('txtValuesForArray');
	util.fnc.setListener({$node:$('#btnPopulateArray'), event:'click', data:{'textNode':d.getElementById('txtValuesForArray')}, listener:util.fnc.populateLclArrayFromString});     
	util.fnc.setListener({$node:$('#btnPrintRevisedArray'), event:'click', data:{'textNode':d.getElementById('txtRemoveArrayElementAt')}, listener:util.fnc.removeElementAt});

});
require(['amdUtil'], function(util){ // want to load and use modules
	
	var w = window, d = document, $ = jQuery;

	util.fnc.causeFocus('txtValuesForArray');
	util.fnc.setListener({$node:$('#btnPopulateArray'), event:'click', data:{'textNode':d.getElementById('txtValuesForArray')}, listener:util.fnc.populateLclArrayFromString});     
	util.fnc.setListener({$node:$('#btnPrintRevisedArray'), event:'click', data:{'textNode':d.getElementById('txtRemoveArrayElementAt')}, listener:util.fnc.removeElementAt});
	util.fnc.setListener({$node:$('#btnPrintAfterShift'), event:'click', data:{'textNode':null}, listener:util.fnc.arrayShift});     	
	util.fnc.setListener({$node:$('#btnPrintAfterPop'), event:'click', data:{'textNode':null}, listener:util.fnc.arrayPop});     	

});
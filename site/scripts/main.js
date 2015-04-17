require(['amdUtil'], function(util){ // want to load and use modules
var w=window,d=document,$=jQuery;
util.fnc.causeFocus('txtValuesForArray');
util.fnc.setListener({$node:$('#btnPopulateArray'),event:'click',data:{'textNode':d.getElementById('txtValuesForArray')},listener:util.fnc.dataChange});
util.fnc.setListener({$node:$('#btnDropDwnRemoveElement'),event:'click',data:{'textNode':null},listener:util.fnc.dataChange});	
util.fnc.setListener({$node:$('#btnPrintAfterShift'),event:'click',data:{'textNode':null},listener:util.fnc.dataChange});
util.fnc.setListener({$node:$('#btnPrintAfterPop'),event:'click',data:{'textNode':null},listener:util.fnc.dataChange});


	var preload = (function(){
		var arrayImages = ['main-background.jpg'];
	    for(var i = 0, len = arrayImages.length; i < len; i++){
	        var Img = new Image();
	        Img.src = 'images/' + arrayImages[i];
	    }
	})();
});
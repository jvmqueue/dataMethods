define(function(){
	var _fnc = {
		removeEndChars:function(paramString, paramChar){
            var regEx = new RegExp('(' + paramChar + '{1,50}$)');
            return paramString.replace(regEx, ''); // remove 50 ending paramChar
		},
		removeAndReplaceChars:function(paramString, paramCharReplace, paramCharSubstitute){
            var regEx = new RegExp(paramCharReplace, 'g');
            return paramString.replace(regEx, paramCharSubstitute); // remove 50 ending paramChar
		},
		removeFirstChar:function(paramString, paramChar){
            var regEx = new RegExp('^'+ paramChar);
            return paramString.replace(regEx, ''); // remove ...
		}
	};
	return{ // public API
		fnc:_fnc // loose binding, allowing adding or removing functions
	};
});
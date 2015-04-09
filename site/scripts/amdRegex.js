define(function(){ // define modules other parts of the application may depend
	var _fnc = {
		removeEndChars:function(paramString, paramChar){ // remove 50 ending paramChar
            var regEx = new RegExp('(' + paramChar + '{1,50}$)');
            return paramString.replace(regEx, '');
		},
		removeAndReplaceChars:function(paramString, paramCharReplace, paramCharSubstitute){ // remove 50 ending paramChar
            var regEx = new RegExp(paramCharReplace, 'g');
            return paramString.replace(regEx, paramCharSubstitute);
		},
		removeFirstChar:function(paramString, paramChar){ // remove first character, first character == paramChar
            var regEx = new RegExp('^'+ paramChar);
            return paramString.replace(regEx, '');
		}
	};
	return{ // public API
		fnc:_fnc // loose binding, allowing adding or removing functions
	};
});
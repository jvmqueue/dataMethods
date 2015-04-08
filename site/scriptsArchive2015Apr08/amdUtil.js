define(function(){
    var w = window, d = document, $ = jQuery;
    var lclArray = [];

    var _appendFragment = function(options){
        var frag = d.createDocumentFragment();
        var nodeExist = options.nodeExist;
        var nodeText = d.createTextNode(options.text);
        var nodeNew = d.createElement('div');
        var nodeLabel = d.createElement('span');
        var nodeLabelText = d.createTextNode(options.label + ':');
        nodeLabel.setAttribute('class', 'jsLabelText');
        nodeLabel.appendChild(nodeLabelText);
        nodeNew.appendChild(nodeLabel);
        nodeNew.appendChild(nodeText);
        frag.appendChild(nodeNew);
        nodeExist.appendChild(frag);
    };

    var _populateLclArrayFromHash = function(paramHash){
        var hash = paramHash;
        for(var name in hash){
            var value = hash[name];
            lclArray.push(value);            
        }
    };


    var _setListener = function(options){           
        options.$node.on(options.event, options.data, options.listener);
    };

    var _populateLclArrayFromString = function(e){ // populate array from string
        
        var $textNode = $(e.data.textNode);
        var strFromNode = $textNode.val();
        lclArray = strFromNode.split(' ');

        _appendFragment({
            label:'Initial Array Values',
            nodeExist:d.getElementById('result'),
            text:lclArray.join()
        });        

        
    };

    var _getLclArray = function(){ // privaledged is puplic but has access to private members
        return lclArray;
    };

    var _causeFocus = function(paramStrId){
        $('#' + paramStrId).focus();
    };

    var _removeElementAt = function(e){
        var $textNode = $(e.data.textNode);
        var intIndex = parseInt( $textNode.val() );
        delete lclArray[intIndex];
        var strFromArray = lclArray.join(',');
        var strFromRegEx = strFromArray.replace(/,,/g, ','); // remove delineator, essetially removing empty values after delete method

        if(strFromRegEx.charAt(0) == ','){ // if first element removed, first character is ","
            strFromRegEx = strFromRegEx.substring(1, strFromRegEx.length);
        }

        lclArray = strFromRegEx.split(','); // repopulate array after regEx.replace
        _appendFragment({
            label:'Array Values After Remove Element',
            nodeExist:d.getElementById('result'),
            text:lclArray.join()
        });           
    };

    return{ // public API
        populateLclArrayFromHash:_populateLclArrayFromHash,
        populateLclArrayFromString:_populateLclArrayFromString,
        getLclArray:_getLclArray,
        removeElementAt:_removeElementAt,
        setListener:_setListener,
        appendFragment:_appendFragment,
        causeFocus:_causeFocus
    };
});
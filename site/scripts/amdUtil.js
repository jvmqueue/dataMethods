define(['amdRegex'], function(utilRegEx){
    var w = window, d = document, $ = jQuery;
    var lclArray = []; // array to maintain state between calls

    var appendFragment = function(options){
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

    var _fnc = { // intended public API
        setListener:function(options){           
            options.$node.on(options.event, options.data, options.listener);
        },
        removeElementAt:function(e){
            var $textNode = $(e.data.textNode);
            var intIndex = parseInt( $textNode.val() );
            var strFromRegEx = null;
            delete lclArray[intIndex];
            var strFromArray = lclArray.join(',');

            strFromRegEx = utilRegEx.fnc.removeAndReplaceChars(strFromArray, ',,', ','); // remove delineator, essentially removing empty values after delete method*/
            strFromRegEx = utilRegEx.fnc.removeFirstChar(strFromRegEx, ','); // remove leading ','
            strFromRegEx = utilRegEx.fnc.removeEndChars(strFromRegEx, ','); // remove 50 ending ','


            lclArray = strFromRegEx.split(','); // repopulate array after regEx work
            appendFragment({
                label:'Array Values After Remove Element',
                nodeExist:d.getElementById('result'),
                text:lclArray.join()
            });           
        },
        populateLclArrayFromString:function(e){ // populate array from string
            var $textNode = $(e.data.textNode);
            var strFromNode = $textNode.val();
            lclArray = strFromNode.split(' ');

            appendFragment({
                label:'Initial Array Values',
                nodeExist:d.getElementById('result'),
                text:lclArray.join()
            });        
        },
        populateLclArrayFromHash:function(paramHash){
            var hash = paramHash;
            for(var name in hash){
                var value = hash[name];
                lclArray.push(value);            
            }
        },
        getLclArray:function(){ // privaledged is puplic but has access to private members
            return lclArray;
        },
        causeFocus:function(paramStrId){
            $('#' + paramStrId).focus();
        }        

    }; // End fnc

    return{ // public API
        fnc:_fnc
    };
});
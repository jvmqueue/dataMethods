define(['amdRegex'], function(utilRegEx){
    var w = window, d = document, $ = jQuery;
    var mArray = []; // array to maintain state between calls

    var appendFragment = function(options){
        var frag = d.createDocumentFragment();
        var nodeExist = options.nodeExist;
        var nodeText = d.createTextNode(options.text);
        var nodeNew = d.createElement('div');
        var nodeLabel = d.createElement('span');
        var nodeLabelText = d.createTextNode(options.label + ':');
        var strClass = null;
        nodeLabel.setAttribute('class', 'jsLabelText');
        nodeLabel.appendChild(nodeLabelText);
        nodeNew.appendChild(nodeLabel);
        nodeNew.appendChild(nodeText);
        frag.appendChild(nodeNew);
        nodeExist.appendChild(frag);
        showNode(nodeExist);
    };

    var showNode = function(paramNodeExist){
        var node = paramNodeExist;
        var strClass = node.getAttribute('class');
        
        if(strClass.indexOf('hide') >= 0){
            strClass = utilRegEx.fnc.removeAndReplaceChars(strClass, 'hide', '');
            node.setAttribute('class', strClass);
        }
    };

    var _fnc = { // intended public API
        setListener:function(options){           
            options.$node.on(options.event, options.data, options.listener);
        },
        removeElementAt:function(e){
            var $textNode = $(e.data.textNode);
            var intIndex = parseInt( $textNode.val() );
            var strFromRegEx = null;
            delete mArray[intIndex]; // mArray[intIndex] now undefined, leaving element empty
            var strFromArray = mArray.join(','); // allows us to use regEx

            strFromRegEx = utilRegEx.fnc.removeAndReplaceChars(strFromArray, ',,', ','); // remove delineator, essentially removing empty values after delete method*/
            strFromRegEx = utilRegEx.fnc.removeFirstChar(strFromRegEx, ','); // remove leading ','
            strFromRegEx = utilRegEx.fnc.removeEndChars(strFromRegEx, ','); // remove 50 ending ','


            mArray = strFromRegEx.split(','); // repopulate array after regEx work
            appendFragment({
                label:'Array Values After Remove Element',
                nodeExist:d.getElementById('result'),
                text:mArray.join()
            });           
        },
        populateLclArrayFromString:function(e){ // populate array from string
            var $textNode = $(e.data.textNode);
            var strFromNode = $textNode.val();
            mArray = strFromNode.split(' ');

            appendFragment({
                label:'Initial Array Values',
                nodeExist:d.getElementById('result'),
                text:mArray.join()
            });        
        },
        arrayShift:function(e){
            mArray.shift();

            appendFragment({
                label:'Array Values After Shift',
                nodeExist:d.getElementById('result'),
                text:mArray.join()
            });        
        },
        arrayPop:function(e){
            mArray.pop();

            appendFragment({
                label:'Array Values After Pop',
                nodeExist:d.getElementById('result'),
                text:mArray.join()
            });        
        },        
        populateLclArrayFromString:function(e){ // populate array from string
            var $textNode = $(e.data.textNode);
            var strFromNode = $textNode.val();
            mArray = strFromNode.split(' ');

            appendFragment({
                label:'Initial Array Values',
                nodeExist:d.getElementById('result'),
                text:mArray.join()
            });        
        },
        populateLclArrayFromHash:function(paramHash){
            var hash = paramHash;
            for(var name in hash){
                var value = hash[name];
                mArray.push(value);            
            }
        },
        getLclArray:function(){ // privaledged is puplic but has access to private members
            return mArray;
        },
        causeFocus:function(paramStrId){
            $('#' + paramStrId).focus();
        }        

    }; // End fnc

    return{ // public API
        fnc:_fnc
    };
});
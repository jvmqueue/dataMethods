define(['amdRegex'], function(utilRegEx){
    var w = window, d = document, $ = jQuery;
    var mArray = []; // array to maintain state between calls
      

    var appendFragment = function(options){
        var frag = d.createDocumentFragment();
        var nodeExist = options.nodeExist;
        var nodeText = d.createTextNode(options.text);
        var nodeNew = d.createElement('tr');
        var nodeLabel = d.createElement('td');
        var nodeCellText = d.createElement('td');        
        var nodeContainerLabel = d.createElement('div');
        var nodeContainerText = d.createElement('div');
        var nodeLabelText = d.createTextNode(options.label + ':');
        var strClass = null;
        nodeContainerLabel.setAttribute('class', 'jsCellContentsLeft');
        nodeContainerText.setAttribute('class', 'jsCellContentsRight');
        nodeNew.setAttribute('class', 'jsRowData');

        nodeContainerLabel.appendChild(nodeLabelText);

        nodeLabel.setAttribute('class', 'jsLabelText');
        nodeLabel.appendChild(nodeContainerLabel);
        
        nodeNew.appendChild(nodeLabel);
        nodeContainerText.appendChild(nodeText);
        nodeCellText.appendChild(nodeContainerText);
        nodeNew.appendChild(nodeCellText);
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

    var updateDropDown = function(paramNodeId){
        var strId = paramNodeId;
        var $node = $('#' + strId);
        var frag = d.createDocumentFragment();
        var nodeNew = null;
        var nodeText = null;
        var mArrayLength = mArray.length;

        $('#dropDwnRemoveElement option', '#frm0').remove(); // reset

        nodeNew = d.createElement('option');
        nodeText = d.createTextNode('Select a value');
        nodeNew.appendChild(nodeText);
        frag.appendChild(nodeNew);

        if(mArray.length > 0){

            for(var i = 0, len = mArrayLength; i < len; i++){
                nodeNew = d.createElement('option');
                nodeText = d.createTextNode(i);
                nodeNew.appendChild(nodeText);
                frag.appendChild(nodeNew);
            }            
        }
        

        $node.append(frag);
    };

    var showOtherDisplayFields = function(){
        var $nodes = $('.optionHide');
         $nodes.removeClass('optionHide');
         $nodes.addClass('jsTransistion');
    };

    var populateLclArrayFromString = function(paramNode){ // populate array from string
        var strFromNode = $(paramNode).val();
        strFromNode = utilRegEx.fnc.removeEndChars(strFromNode, ' '); // remove any ending whitespace
        mArray = strFromNode.split(' ');

        appendFragment({
            label:'Initial Array Values',
            nodeExist:d.getElementById('result'),
            text:mArray.join()
        });
        
        // array populated, show other page options
        showOtherDisplayFields();        
    };

    var arrayShift = function(){
        mArray.shift();

        appendFragment({
            label:'Array Values After Shift',
            nodeExist:d.getElementById('result'),
            text:mArray.join()
        });
    };
    var arrayPop = function(){
        mArray.pop();

        appendFragment({
            label:'Array Values After Pop',
            nodeExist:d.getElementById('result'),
            text:mArray.join()
        });        
    };

    var removeElementAt = function(){
        var intIndex = $('#dropDwnRemoveElement option:selected').index() - 1;

        if(intIndex < 0){
            return void(0);
        }

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


        
    }; // End removeElementAt

    // TODO: every data change function should call this listener
    // TODO: dataChange listener should act as a factory, switch block determines what action to perform relative to e.data

    var _fnc = { // intended public API
        dataChange:function(e){
            var nodeFrmData = e.data.textNode;
            var target = e.target;
            var strId = target.getAttribute('id');

            // determine which control sent message
            switch(strId){
                case 'btnDropDwnRemoveElement':
                    removeElementAt();                
                    break;
                case 'btnPopulateArray':
                    populateLclArrayFromString(nodeFrmData);
                    break;
                case 'btnPrintAfterShift':
                    arrayShift();
                    break;              
                case 'btnPrintAfterPop':
                    arrayPop();
                    break;                                      
                default:
            }
            updateDropDown('dropDwnRemoveElement'); // update dropdown relative to mArray values
        },        
        setListener:function(options){           
            options.$node.on(options.event, options.data, options.listener);
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
define(['amdRegex'], function(utilRegEx){
    var w = window, d = document, $ = jQuery;
    var mArray = []; // array to maintain state between calls
      

    var appendFragment = function(options){
        var frag = d.createDocumentFragment();
        var nodeExist = options.nodeExist;
        var nodeContainer = {
            label:d.createElement('div'),
            text:d.createElement('div')
        };
        var nodeCell = {
            label:d.createElement('td'),
            text:d.createElement('td')
        };

        var nodeRow = d.createElement('tr');

        nodeContainer.label.appendChild( d.createTextNode(options.label + ': ') );
        nodeContainer.text.appendChild( d.createTextNode(options.text) );
        nodeContainer.label.setAttribute('class', 'jsCellContentsLeft');
        nodeContainer.text.setAttribute('class', 'jsCellContentsRight');        

        nodeCell.label.appendChild(nodeContainer.label);
        nodeCell.text.appendChild(nodeContainer.text);

        nodeRow.appendChild(nodeCell.label);
        nodeRow.appendChild(nodeCell.text);
        nodeRow.setAttribute('class', 'jsRowData');

        frag.appendChild(nodeRow);

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

    var checkIfArrayIsEmpty = function(){
        if( (mArray.length > 0) && (mArray[0].length > 0) ){ // first element of empty array is empty string        
            return false;
        }
        return true;
    };

    var updateDropDown = function(paramNodeId){
        var strId = paramNodeId;
        var $node = $('#' + strId);
        var frag = d.createDocumentFragment();
        var nodeNew = null;
        var nodeText = null;
        var mArrayLength = mArray.length;
        var blnArrayIsEmpty = null;

        $('#dropDwnRemoveElement option', '#frm0').remove(); // reset

        nodeNew = d.createElement('option');
        nodeText = d.createTextNode('Select a value');
        nodeNew.appendChild(nodeText);
        frag.appendChild(nodeNew);

        blnArrayIsEmpty = checkIfArrayIsEmpty();
        
        
        if(blnArrayIsEmpty === false){
            for(var i = 1, len = mArrayLength; i <= len; i++){
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
        var blnArrayIsEmpty = checkIfArrayIsEmpty();
        
        mArray.shift();

        appendFragment({
            label:'Array Values After Shift',
            nodeExist:d.getElementById('result'),
            text:mArray.join()
        });
    };
    var arrayPop = function(){
        var blnArrayIsEmpty = checkIfArrayIsEmpty();

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


    var _fnc = { // public API
        dataChange:function(e){
            var nodeFrmData = e.data.textNode;
            var target = e.target;
            var strId = target.getAttribute('id');
            
            switch(strId){ // determine which control sent message
                case 'btnDropDwnRemoveElement':
                    removeElementAt();                
                    break;
                case 'btnPopulateArray':
                    $('input[type=button]').removeAttr('disabled'); // reset
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

            if( (mArray.length === 0) || (!mArray[0]) ){
                $('.jsTransistion input[type=button]').attr('disabled', 'disabled');
            }
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
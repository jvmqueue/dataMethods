define(function() {
    var _privateMember = function(){
    	return 'Hello World from _privateMember';
    };

    var _MyObject = function(){
    	this.name = '_myObject';
    };
    _MyObject.prototype = {
    	firstMember:function(){
    		console.group('_MY OBJECT FIRST MEMBER');
    			console.log('Reached');
    		console.groupEnd();	
    	}
    };
    _MyObject.staticMember = function(){
    	console.group('_MY OBJECT STATIC MEMBER');
    		console.log('Reached');
    	console.groupEnd();	
    };


    // example of a delete method, primitive JS	

    // do other initialization work here...
    return{ // API
        someProp: 'Oooh, how interesting!',            
        privalegedMember:_privateMember,
        MyObject:_MyObject
    };
});
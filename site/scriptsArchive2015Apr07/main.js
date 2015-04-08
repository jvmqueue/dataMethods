require(['amdUtil'], function(util){
	// amdUtil.js must exist, it's a dependency
	// now, amdUtil must be in a define wrapper
	var myObject = new util.MyObject();
	myObject.firstMember();
	// now remove firstMember from myObject via delete
	// can remove static not instance members
	delete myObject;
	
	var hash = {first:0, second:1, third:2};
	var myArray = [];
	
	for(var prop in hash){
		myArray.push(hash[prop]);
	}

/*	for(var prop in hash){
		
		if(hash[prop] === 1){
			hash[prop] = null;
		}
		console.group('HASH');
			console.log('hash[prop]:\t', hash[prop]);
			console.log('typeof hash[prop]:\t', typeof hash[prop]);
		console.groupEnd();	
	}*/

	for(var i = 0, len = myArray.length; i < len; i++){
		console.group('MY ARRAY');
			console.log('myArray['+i+']:\t', myArray[i]);
		console.groupEnd();	
	}

/*	myArray.pop();

	for(var i = 0, len = myArray.length; i < len; i++){
		console.group('MY ARRAY STACK LAST IN FIRST OUT');
			console.log('myArray['+i+']:\t', myArray[i]);
		console.groupEnd();	
	}	*/

/*	myArray.shift();

	for(var i = 0, len = myArray.length; i < len; i++){
		console.group('MY ARRAY QUEUE FIRST IN FIRST OUT');
			console.log('myArray['+i+']:\t', myArray[i]);
		console.groupEnd();	
	}		*/

	myArray.unshift(-7);

	for(var i = 0, len = myArray.length; i < len; i++){
		console.group('MY ARRAY UNSHIFT PUSHES ELEMENT ON TOP');
			console.log('myArray['+i+']:\t', myArray[i]);
		console.groupEnd();	
	}			


	

});
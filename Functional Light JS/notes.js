//LABjs
//grips
//asynquence

//Functional Light Programming


//Function that produce Side Effects
//Effects that occur indirect of what you want out of  function
 function foo(x){

 	y = x * 2;
 	z = x * 3;
 }

 var y, z;

 y; //10
 z; //15

 //Changing the state of y and z forever so IMPURE

 //Pure is no side effects

 function abr (x,y,z){
 	foo(x);

 	return [y,z];

 		function foo(x) {
 			y = y * x;
 			z = y * x;
 		}
 }

bar(5,2,3); //-->[10,15]

bar(5,10,5); // --?[50,75]


//Exercise 1//
//Pure function bar from impure Foo

function bar(x,y){
	var z;

	foo(x);
 	return[y,z];

	function foo(x){
		
		y++;
		z= x * y;
	}
}

bar(20, 5); //[6,120]
z;				
bar(25, 6); //[7, 175]
z;

// Pure functions do not change the outside state 


////////////Composition/////////////
//Output of one function and output is input to another function

function sum (x,y){
	return x + y;
}

function mult(x,y){
	return x * y;
}

sum(mult(3,4), 5); //17

/// Alternate

function multSum(x,y,x){
	return sum(mult(x,y), z);
}

multSum(3,4,5); //17

////Immutability///////
//non ability to mutate

function doubleTheMutable (arr){
	var newList = [];
	for(var i =0;i<arr.length;i++){
		newList[i] = arr[i]*2;
	}
	return newList;
}

var arr = [3,4,5];

doubleTheMutable(arr);

/////Closure////
//remembers variables around it, even when the function is execiuted elsewhere

function foo(){
	count = 0;

	return function() {
		return count++;
	};
}

var x = foo();

x();   // 1
x();  //  2
x(); //  3

function sumX(x) {
	return function(y) {
		return x + y;
	}
}

var add10 = sumX(10);
add10(3); // --> 13
add10(14); // --> 24
//Funcion can remember variables around it;

///////Exercise 2/////////

function foo(x,y) {

	return function(){
		return x + y;
	}
}

var x = foo(3,4);
x();


////////Recursion////////
// function that you define and you want that function to stop at a base case
// same name to call itself within the function

///Example 3 Recursion Exercise///

function sumIter() {
	var sum = 0;
	for(var i =0; i<arguments.length;i++){
		sum += arguments[i];
	}
		return sum;
}

sumIter(3,4,5); // - > 12

//using recursion
//ES6
function sumRecur(...args) {
	if(arg.length <=2){
		return args[0] + args [1];
	}
	return args[0] + 
		sumRecur(...args.slice(1));

}

/////Exercise 3 Recursion///
//Take mult to use recursion to take a bunch of args

function mult(...args) { //gather everything into array args
	
	if(args.length<=2){
		return args[0] * args[1];
	}
	return args[0] *
		mult(...args.slice(1)); // slice first value off! because taken care of at [0] index
}

mult(3,4,5) // -->60;
mult(3,4,5,6); // --> 360;

//slice produces hole array to new array
//splice changes the array in place -- mutable


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


//List Transformation - MAP//
 function doubleIt(a){
 	return a*2;
 }

function transform(arr,fn){
	var results = [];
	for(var i =0;i<arr.length;i++){
		results[i]= fn(arr[i]);
	}
	return results;
}

transform([1,2,3,4,5], doubleIt); // [2,4,6,8,10]; this array is completely new

// Built in version "prototype" on the array

function doubleIt(a){
	return a*2;
}

[1,2,3,4,5].map(doubleIt);


// Build filter

function isOdd (a){
	return a%2===1;
}

function exlude(arr, fn){
	var results = [];
	for(var i=0;i<arr.length;i++){
		if(fn(arr[i])){
			results.push(arr[i]);
		}
	}
	return results;
}

[1,2,3,4,5].filter(isOdd);

//should always return true if you want to keep it

//Compose Values together REDUCE

// idea of summation value a + b = c;
// Can be used in a 'non-pure' way
//composition so need 2 values

function mult(x,y){return x*y;} //x = accum; y = val;

function compose(arr, fn, initial){
	var total = initial;
	for(var i =0;i<arr.length;i++){
		total = fn(total,arr[i]);
	}
	return total;
}

compose([1,2,3,4,5], mult, 1);

//accum == you have something like a running total as you continue to multiply

//List Iteration

function logValue(v){console.log(v);}

function iterate(arr, fn){
	for(avr i=0;i<arr.length;i++){
		fn(arr[i]);
	}
}


iterate([1,2,3,4,5], logValue);
//1,2,3,4,5;

[1,2,3,4,5].forEach(logValue);

//Exercise 4
//Funcitonal programming Exercise


//function foo(){
//	return 42;
//}

//function bar() {
//	return 10;
//}


function foo(x){
	return function(){
		return x;
	};
}




function add(x,y){ // called a thunk -- function wrapped around a value
	return x+y;
}

function add2(fn1,fn2){
	return add(fn1(), fn2());
}

//add2(foo, bar); //--> 52
add2(foo(10), foo(42));

//Exercise 4 Part 2

// Create add(n);

function addn(arr){
var total = 0;
for(var i =0;i<arr.length;i++){
	total = add2(foo(arr[i]), foo(total));
}
return total;
}


addn(10,42,56,73);

//Solved with recursion
// Need a base case- addition of first 2 items plus everything else

/*function addn (arr){
	if(arr.length<=2) {
		return add2(foo(arr[0]), foo(arr[1]) );

	}
	//recursion case
	return addn([
		function() {
			add2(arr[0], arr[1]);
		}]. concat(arr.slice(2))
	);
}*/


//Exercise 4 Part 3

function addn(arr){
	return arr // cuts first value off
	
		.reduce(function(prev,curr){
			return function(){
				return add2(prev,curr);
			};
		},arr[0])();
}

addn([foo(10), foo(42), foo(56), foo(73)]);




//Exercise 4 part 5
function addn(arr){
var total = 0;
for(var i =0;i<arr.length;i++){
	total = add2(foo(arr[i]), foo(total));
}
return total;
}

var arr = [10,42,56,73,15,2,98,7];

function isOdd(v){return v%2==1;}

function isEven(x) {return !isOdd(x);}

var isEven = composeNeg(isEven);

arr.filter()

addn(arr.map(foo));

//


function isEven(v){return v%2===0;}

var arr = [10,42,56,73,15,2,98,7]
	.filter(isEven)
		.map(foo);

addn(...arr); 





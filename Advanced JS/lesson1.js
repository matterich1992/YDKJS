//Scope - where to look for things
//Javascript has function scope only

var foo = "bar"; // In global Scope

function bar() { // function declaration // new scope in bar
	var foo = "baz";
}

function baz(foo){
	foo = "bam";   // Do you have LHS reference for "foo"? -- bam is applied to foo
	bam = "yay";   // Does not exist --> then we start going out levels of scope to global(will say yes)
}

/////////////////////Scope///////////////////////

var foo = "bar"; //LHS called foo

function bar() { //RHS for a function called bar

	var foo = 'baz'; //scope of bar-- declared local

	function baz(foo){
		foo = "bam";
		bam = 'yay';
	}
	baz(); //RHS for a variable declared called baz-- it's a function
}

bar(); //executes function from bar variable function

foo;   //--> 'bar' RHS
bam;   //--> "yay" RHS
baz(); //--> global scope doesnt know this exists -- Reference Error

////////Declarations versus Expressions/////////

var foo = function bar(){ //'bar' nor declared in the outer scope
	var foo = "baz";

	function baz(foo){
		foo=bar;
		foo;
	}
	baz();
};

foo();
bar();  //Error!

//Use named function expressions to reference functions inside of themselves


var foo;

try {

	foo.length;
}

	catch(err){
		console.log(err);// Type Err
	}
console.log(err);// Ref Err

/////////////////////Lexical Scope and Dynamic Scope/////////////////////
var bar = 'bar';

	function foo(str){
		eval(str); // assumes scope and cannot optimize the lookups
		console.log(bar);
	}

foo("var bar=42;");// eval treats str as actual code


////////IIFE///////// immediately invoked function expression

var foo = "foo";

(function(){
	
	var foo = "foo2";
	console.log(foo); //"foo2"

})();

console.log(foo); //"foo"

/////Block Scope with let ES6////////
//let is the cousin of var-- attaches variable to block

function foo() {
	var bar = "bar";
	for(let i =0; i<bar.length;i++){
		console.log(bar.charAt(i));
	}
	console.log(i);
}

foo();

//Let keyword does not hoist


//Quiz 1//


///Dynamic Scope//
// Javascript has Lexical Scoping
//Functions Create new Scope and curly braces with let
//undeclared has not been declared but undefined means the variable doesnt currently have a value

///////////Hoisting/////////////
foo();

var foo = 2;

function foo(){
	console.log("bar");
}

function foo(){
	console.log("foo");
}


////////////////THIS////////////////

//Every function while executing has a reference to its own execution context known as ;This'

//'this' is like the address of a building where we are looking

function foo() {
	console.log(this.bar); //referencing an object that we can look up properties on
}

var bar = "bar1";
var o2 = {bar: "bar2", foo:foo};
var o3 = {bar: "bar3", foo: foo};

foo();    // bar 1 //default this keyword to global, if 'strict', then undefined 
o2.foo(); // bar 2 //implicit binding rule - object prop reference at call site - base object becomes "this";
o3.foo(); // bar 3


var o1 = {
 bar: 'bar1',
 foo: function(){
 	console.log(this.bar);
 }

};

var o2 = {bar: "bar2", foo:foo};
var bar = "bar3";

var foo = o1.foo;

o1.foo(); // "bar1"
o2.foo(); //"bar2"
foo(); //"bar3"





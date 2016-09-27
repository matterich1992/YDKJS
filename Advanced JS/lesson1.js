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


////////IIFE/////////

var foo = "foo";

(function(){
	
	var foo = "foo2";
	console.log(foo); //"foo2"

})();

console.log(foo); //"foo"

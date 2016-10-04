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


var obj1 = {
	bar: "bar1",
	foo: function(){
		console.log(this.bar);
	}
};

var o2 = {bar: "bar2", foo: obj1.foo};
var bar = "bar 3";

var foo = obj1.foo;

obj1.foo();
o2.foo();
foo();

///////Binding/////

function foo() {
	var bar = "bar1";
	baz();
}

function baz() {
	console.log(this.bar);
}

var bar = 'bar2';

foo(); //--> "bar 2" // default

////Explicit Binding
 //.call or .apply their first arg is a this

function foo() {
	console.log(this.bar);
}

var bar = "bar1";
var obj = {bar: "bar2"};

foo();//-->bar1;
foo.call(obj); //-->'bar 2';


// Hard- Binding

function foo() {
	console.log(this.bar);
}

var obj = {bar: "bar"};
var obj2 = {bar: "bar2"};

var orig = foo; // reference to the og function
foo = function(){orig.call(obj);}; //overwrite the foo but will always be called with obj this bonding


foo(); // --> 'bar'
foo.call(obj2); // -->'bar'


function bind (fn, o) {
	return function() {
		fn.call(o);
	};
}

function foo() {
	console.log(this.bar);
}

var obj = {bar: 'bar'};
var obj2 = {bar: 'bar2'};

	foo = bind(foo, obj);

	foo(); // "bar";
	foo.call(obj2); //???


//// the 'new' keyword///////

function foo() {
	this.baz = "baz";
	console.log(this.bar + " " + baz);
}

var bar = "bar";

var baz = new foo(); // undefined undefined
baz.baz();

// four things that occur when new keyword is new
//1. new object is created
//2. object gets linked to a different object
//3. bound as the new 'this' keyword
//4. Implicitly inserts a return 

// ''This' rules'

//1. was it called with the new keyword
//2. explicit with call, apply, bind
//3. imlicit binding with owning/containing object
//4. Default to 'global'



/////////CLOSURE Advanced JS//////////
// function remembers lexical scope even when function is executed outside lexical scope


function foo() {
	var bar  = 'bar';

	function baz () {
		console.log(bar);
	}
	bam(baz);
}

function bam (baz) {
	baz();
}

foo(); // --> 'bar'


function foo() {
	var bar = "bar";

	return function() {
		console.log(bar);
	};
}

function bam () {
	foo()();
}

bam();


function foo () {
	var bar = 0;

	setTimeout(function(){
		console.log(bar++);
	},100);
	setTimeout(function(){
		console.log(bar++);
	},100);
}

foo();


function foo() {
	var bar = 0;

	return function() {
		bar++;
	}
}

var x = foo();



for(var i =1;i<=5; i++){
	setTimeout(function(){
		console.log('i: ' + i);
	}, i*1000);
}

// we want a scope for each iteration

for (var i =1;i<=5;i++){
	(function(i){
		setTimeout(function(){
			console.log("i: " + i);
		}, i*1000);
	})(i);
}


//Closure Loops and Block Scope//
for(let i =1l i<=5;i++){
	setTimeout(function(){
		console.log(i);
	}, i*1000);
}
// New let creates new instance of i for each iteration

// Module Pattern

// outer wrapping funciton that is executed
// one or more inner functions must be returned

var foo = (function(){

	var o = {bar: "bar"};

	return { 
	bar: function(){
		console.log(o.bar);
	}
  };
})();

foo.bar();  //bar


var foo = (function(){
	var publicAPI = {
		bar: function(){
			publicAPI.baz();
		},
		baz: function() {
			console.log("baz");
		}
	};
	return publicAPI;
})();

foo.bar();

// Modern Module Pattern

define("foo", function(){

	var o = {bar: "bar"};

	return {
		bar: function() {
			console.log(o.bar);
		}
	};

});


//Object Oriented Programming//

// Common Patterns
// "inheritance" vs "Behavior Delegation"

// Prototype Mechanism //


//Every single object is built by a construtor function
// A constructor makes an object linked to it's own prototype
// in Javascript there is no copy made, but they actually create a new object that is linked to


function Foo(who) {
	this.me = who;
}

Foo.prototype.identify = function(){
	return " I am " + this.me;
};

var a1 = new Foo("a1"); // Brand new Object has been created
var a2 = new Foo("a2"); // Brand new object that gets "me" property as well


a2.speak = function(){
	alert("Hello," + this.identify() + ".");
};

a1.constructor ===Foo;
a1.constructor ===a2.constructor;

a1.__proto__ === Foo.prototype; 
a1.__proto__ === a2.__proto__;

// Both a1 and a2 point to the same Foo Object "Foo.prototype"
// Prototype linkages
// can call a1.identify; --> 'this' is now a1
// can call a2. identify; -- 'this' is now a2


// rewrite the code in a different way
function Foo() {
	this.me = who;
}

Foo.protoype.identify = function(){
	return 'I am ' + this.me;
};

var a1 = Foo("a1");
a1.identify(); // " I am a1 "

// Will always find this guy because it is directly on the object
a1.identify = function(){ // Adding a new function directly to "a1"
	alert("Hello, " +
		Foo.prototype.identify.call(this) + "."
	 )
};

a1.identify();// "Hello, I am a1"

// Now we have to use the crazy syntax of Foo.prototype.identify.call(this)or "a1";
// Use different method names to delegate to other methods so that there is no overlap
// 'this" is always refernced at the call site --> see next code block

function Foo() {
	this.me = who;
}

Foo.prototype.identify = function() {
	return "I am " + this.me;
}

Foo.prototype.speak = function(){
	alert("Hello " + this.identify() + ".");
};

var a1 = new Foo("a1"); // "a1" now becomes this in all versions above of Foo prototype


a1.speak(); // "Hello, I am a1."
a1.identify(); // "I am a1"

//a1 delegates up the prototype chain to Foo function that has all methods from prototype
// Examples of prototype linkage behavior delegation^^
 




















/*
1. Please explain JS mechanism (sync and async code and event loop)


2. What is the difference between function declaration and function expression?
  function declaration:
    function aFunction() {}

  function expression:
    let bFunction = function() {};
    OR using arrow function
    let bFunction = () => {};
  
  Obviously, the syntax is different.
  But the main difference is that function declaration gets hoist to the top when we run the .js file, whereas function expression doesn't get hoist to the top.
  Therefore, we will get errors if we try to use a function expression before we express it.
  Also, function declaration allows us to do IIFE (Immediately-Invoked Function Expression), meaning calling/using the function right away.

3. Let vs const vs var?


4. List ES6 features you know


5. Function prototype methods, bind vs apply cs call?


6. How to deep copy object in JS?
  Use JSON.stringify() and JSON.parse()
    let obj = {};
    let objDeepCopy = JSON.parse(JSON.stringify(obj));


7. Event bubbling vs Event Capturing ? What is Event Delegation?


8. What is Closure in JS?


*/

/* 1. What’s the console output for the below code?
Write the output in order and error type if there are any errors.

function createIncrement() {
  let value = 0;
  function increment() { 
    ++value;
    console.log(value);
  }
  const msg1= `msg1: ${value}`; 
  function log() {
    const msg2 = `msg2: ${value}`;
    console.log(msg1);
    console.log(msg2);
  }
  return [increment, log];
} 
const [increment, log] = createIncrement(); 
increment();
increment();
log();
*/

/* 2. Given an array and print output data at schedule

let list = [
  {
    value: 'a',
    delay: 2000
  },
  { 
    value: 'b',
    delay: 1000
  },
  { 
    value: 'c',
    delay: 3000
  }, 
  ... 
];

We need to output ‘a’ after 2 seconds, output ‘b’ 1 second after ‘a’, and output ‘c’ 3 seconds after ‘b’

function printTasks(list) { 

}
*/
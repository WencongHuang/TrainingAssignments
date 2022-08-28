/*
1. Please explain JS mechanism (sync and async code and event loop)
  Usually, when we write a program, the program is synchronous. Meaning the instruction of the program will be executed from top to bottom.
  However, asynchronous programming gives us the idea of we executed the instruction now, but those instructions will be finished later.
  Event loop is just a endless loop, where it will wait for tasks/instructions, execute those tasks, then go back and wait for more tasks.

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
  Also, function declaration allows us to do IIFE (Immediately-Invoked Function Expression), meaning calling/using the function right away. It is a one time usage function and won't get store into memory.

3. Let vs const vs var?
  var allows variable to re-declare.
    var again = 0;
    var again = 1; // 0 is replaced by 1
  var allows us to access it before declaration.
    console.log(hi); // undefine
    var hi = "Hello";
  var will be scoped to the function scope and hoisted to the top of the scope.
    (Almost the same idea as...)
    var hi;
    console.log(hi); // hoisting is the reason why hi is undefined.
    var hi = "Hello";


  let and const are NOT allow variable to re-declare.
    let again = 0;
    let again = 1; // SyntaxError
  let and const are NOT allow us to access it before declaration.
    console.log(hi); // ReferenceError
    let hi = "Hello";
  let and const both scope to the block scope {} and will NOT be hoisted to the top of the scope.
  

  let allows re-assignment and const does NOT allow re-assignment.
    let number1 = 0;
    number1 = 1; // Ok

    const number2 = 0;
    number2 = 1; // Error, can't re-assign a constant.

4. List ES6 features you know
  let/const vs var
  Arrow function
  String literal
  Destructuring
  Spreading syntax
  Default and Rest parameter syntax
  Promise
  Class

5. Function prototype methods, bind vs apply cs call?
  apply() and call() both trigger the function immediately.
    However,
      call() takes individual parameters.
      apply() takes an array of parameters.
    Syntax:
      thisArg = "The value to use as this when calling function"
      call(thisArg, arg1, ... , argN)
      apply(thisArg, [arg1, ... , argN])

  bind() will trigger the function later and NOT immediately. AND it will return a new function!
    Syntax:
      bind(thisArg, arg1, ... , argN)

6. How to deep copy object in JS?
  Use JSON.stringify() and JSON.parse()
    let obj = {};
    let objDeepCopy = JSON.parse(JSON.stringify(obj));

  Use lodash -> cloneDeep()
    import "cloneDeep" from "lodash";
    ...Later in the project...
    let obj = {};
    let objDeepCopy = cloneDeep(obj);

  Or, create your own method!

7. Event bubbling vs Event Capturing ? What is Event Delegation?
  Event bubbling is when a event is triggered, the order will start from the event target itself first, then go up to its parent, then its grandparent until their very first ancestor. Go through all the way to the DOM tree.
  Event capturing is the opposite of event bubbling. When a event is triggered, it will start from the top of the DOM tree, and all the way down to the event's grandparent, then to its parent, and finally to the event itself.

  Event delegation is a technique. When we have a lot of elements that handle in a similar way and instead of give every element a handler, we can just give a single handler to their common ancestor.

8. What is Closure in JS?
  A closure is an inner function returned by outer function that still has access to it's outer scope variables.

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
increment(); // 1
increment(); // 2
log();       // msg1: 0
             // msg2: 2

This assignment is about closure, where an inner function gets returned by the outer function and still have access to the outer function scope.
In this case, value, increment, msg1, and log are in the same scope.
When increment gets call, variable value will increase by 1 and gets prints out.
So for the first call, we will get "1" in the console.
And the second, we will get "2" in the console.
msg1 is a constant and the value is passed into msg1 during its assignment, so it will be "msg1: 0".
msg2 on the other hand is inside the log function, and the value will gets update when log is called, so we will get "msg2: 2"
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
];

function printTasks(list) {
  // This method below will create 3 setTimeout/async at the same time, and will run at the same time after the Main thread. Not a good idea for this assignment.
  // list.forEach(element => {
  //   setTimeout(() => console.log(element.value), element.delay);
  // });
  
  // This is what we want, we want to print the value one after another one, we will do it nested.
  // setTimeout(() => {
  //   console.log(list[0].value)
  //   setTimeout(() => {
  //     console.log(list[1].value)
  //     setTimeout(() => {
  //       console.log(list[2].value)
  //     }, list[2].delay);
  //   }, list[1].delay);
  // }, list[0].delay);

  // This code below is a generic solution to the problem based on the observation above. What are we going to do if we have N items in the list?
  let cnt = 0;
  setTimeout(function next() {
    console.log(list[cnt].value);
    // check if it is the last element of the array/list.
    if(cnt === list.length - 1) {
      return;
    }
    setTimeout(next, list[++cnt].delay);
  }, list[cnt].delay);
}

printTasks(list);



const buttonArray = document.querySelectorAll("button");
const divArray = document.querySelectorAll(".rectangles");
// use to store references to every eventListener.
let handlers = [];

function removeListener() {
  for(let i = 0; i < divArray.length; ++i) {
    divArray[i].removeEventListener('click', handlers[i]);        // For remove Bubbling
    divArray[i].removeEventListener('click', handlers[i], true);  // For remove Capturing
  }
  handlers = [];
}

// Get all children and grandchildren of an element recursively.
function getAllChildren(htmlElement) {
  // Check if we are at the deepest element; if there is no child, we just return the element.
  if (htmlElement.children.length === 0) {
    return [htmlElement];
  } 
  let allChildElements = [];
  
  for (let i = 0; i < htmlElement.children.length; ++i) {
    // Push incoming children from deeper level of recursive call.
    let children = getAllChildren(htmlElement.children[i]);
    if (children) {
      // Note: we can do push or unshift.
      // But, we want to use unshift in this case since we want to see the element that is on the very top first.
      allChildElements.unshift(...children);
    }
  }
  // Don't forget to push/unshift the element itself.
  allChildElements.unshift(htmlElement);

  return allChildElements;
};

// This function is use for the extra part.
function extra(event) {
  event.stopPropagation();
  // event.target is the element when user clicked on.
  // getAllChildren() will return an array, so we can just use the build-in method, Array.forEach().
  getAllChildren(event.target).forEach(element => {
    alert(element.id);
  });
}

function changeMode(mode) {
  for(let i = 0; i < divArray.length; ++i) {
    // Since every time we run addEventListener, it will run as a "new function" (different references) that have the same name.
    // Therefore, we need to store all the references so that we can remove it later when user want to switch to different mode.

    // Check if user want to see the extra part. If yes, bind it to the extra function; if not, just bind it with alert.
    let wrapper = mode.toUpperCase() === "EXTRA" ? extra.bind(this) : alert.bind(this, divArray[i].id);
    handlers.push(wrapper);

    if(mode.toUpperCase() === "BUBBLING") {
      divArray[i].addEventListener('click', wrapper);
    } else if (mode.toUpperCase() === "CAPTURING") {
      divArray[i].addEventListener('click', wrapper, true);
    } else if(mode.toUpperCase() === "EXTRA") {
      divArray[i].addEventListener('click', wrapper);
    }
  }
}

// Create three buttons that can switch between Bubbling, Capturing, and Extra part.
for(let i = 0; i < buttonArray.length; i++) {
  buttonArray[i].addEventListener('click', function() {
    removeListener();
    changeMode(buttonArray[i].innerHTML);
  });
}
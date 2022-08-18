"use strict";

/**
 * flatten array using Depth-first search / Breadth-first search
 * assuming elements in array are numbers and arrays only
 * the order of output array doesn't matter
 */
function dfsFlatten(arr) {
  // DFS uses stack, but I didn't use a stack.
  let result = [];
  arr.forEach((item) => {
    if(Array.isArray(item)) {
      result = result.concat(bfsFlatten(item));
    } else {
      result.push(item);
    }
  });
  return result;
}

function bfsFlatten(arr) {
  // BFS uses queue
  let queue = [...arr];
  let result = [];
  while(queue.length) {
    // start from the beginning and check if the element is an array
    const next = queue.shift();
    // if the element is an array, push everything of that element in the queue
    if(Array.isArray(next)) {
      queue.push(...next);
    // otherwise, it is just a simple element, push it in the result
    } else {
      result.push(next);
    }
  }
  return result;
}

const rawArr = [1, 2, [3, 4, [5, 6], 7], 8, [9, 0]];
console.log("DFS:", dfsFlatten(rawArr));
console.log("BFS:", bfsFlatten(rawArr));


// Leetcode Problem Solving
/**
 * Leetcode #1
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function(nums, target) {
  for(let i = 0; i < nums.length; i++){
    for(let j = i+1; j < nums.length; j++){
        if(target - nums[i] == nums[j]) {
            return [i, j];
        }
    }
  }
};

/**
 * Leetcode #9
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function(x) {
  return String(x) === String(x).split('').reverse().join('');
};

/**
 * Leetcode #15
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function(nums) {
  let result = [];
    
  nums.sort((a, b) => a - b);
  
  for(let i = 0; i < nums.length - 1; i++) {
    // can't be the same as the previous value
    if( i > 0 && nums[i] === nums[i -1]) {
      continue;
    }
    
    let left = i + 1;
    let right = nums.length - 1;
    
    while(left < right) {
      let sum = nums[i] + nums[left] + nums[right];
      if(sum < 0) {
        left++;
      } else if(sum > 0) {
        right--;
      } else {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        //keep looking for the next one that is not equal the previous and lower than right
        while(nums[left] === nums[left - 1] && left < right) {
          left++;
        }    
      }
    }
  }
  
  return result;
};


// Array Prototype Methods Implementations
// pass given test cases (no need for perfect implementation involving specific thisArg)
// Example:
Array.prototype.forEach = function(fn) {
  typeof fn === "function" && fn.apply(null, this);
};
console.log("forEach: ", [1,2,3].forEach(console.log));

// ==== Native Filter ====
Array.prototype.filter = function(fn) {
  // it will receive all values that match to condition passed in fn callback.
  const filtered = []; 
  for (let i = 0; i < this.length; i++) {
    if (fn(this[i])) {
      filtered.push(this[i]);
    }
  }
  return filtered;
};
const filter_words = ['a', 'ab', 'bcd', 'asdf', 'asdfre', 'qwerre'];
console.log('filter: ', filter_words.filter(word => word.length > 3));

// ==== Native Map ====
Array.prototype.map = function(fn) {
  const mapped = [];
  for(let i = 0; i < this.length; i++) {
    mapped.push(fn(this[i]));
  }
  return mapped;
};
const map_array = [1, 4, 9, 16];
console.log("map:", map_array.map(x => x * 2));

// ==== Native Reduce ====
Array.prototype.reduce = function(fn, ...rest) {
  // Works for number array
  let result = rest.length ? rest[0] : this[0];

  for(let i = 0; i < this.length; i++) {
    // skip the first element if no initial value
    if(i === 0 && !rest.length) {
      continue;
    }
    // order matters here, result must goes first as accumulator
    result = fn(result, this[i]);
  }

  return result;
};
const reduce_array = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log("reduce:", reduce_array.reduce(reducer));
console.log("reduce:", reduce_array.reduce(reducer, 10));

// ==== Native Bind ====
Function.prototype.bind = function(refObj, ...args1) {
  const fn = this;
  return (...args2) => { return fn.apply(refObj, [...args1, ...args2]); };
};

// test case 1
const test = {
  name: "Jesse",
  func: function() {
    console.log(this.name);
  }
};

test.func(); // Jesse
const newf = test.func.bind({name: "Abby"});
newf(); // Abby

// test case 2
const func = (a, b) => a+b;
const boundFunc = func.bind(null, 'foo');
console.log(boundFunc('bb', 'cc')); // foobb

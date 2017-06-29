var funcs = [];

// i is a global variable
for (var i = 0; i < 3; i++) {
  funcs.push(function () { console.log(i); });
}

for (var j = 0; j < 3; j++) {
  funcs[j]();
}

// since var i is a global variable,
// and it exists in the global scope, the console.log(i) in Array will reference the i in the global scope
// Therefore, i is 3
// the for loop is not closure. that's the main reason
// if you want to hold i reference in each loop, you will have to demonstrate closure pattern


var funcs = [];

// i is a global variable
for (var i = 0; i < 3; i++) {
  (function (index) { //  Closure
    funcs.push(function () { console.log(index); });
  }(i));  // i in to Closure
}

for (var j = 0; j < 3; j++) {
  funcs[j]();
}

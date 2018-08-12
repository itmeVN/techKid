'use strict'

function search(input, target) {
  var res = -1;
  for(let i = 0;i<input.length;i++){
    if(input[i] === target)
      res = i;
  }
  return res;
}

module.exports = search

'use strict'

function sort(input) {
  for(let i =0;i< input.length;i++){
    for(let j =0;j<input.length;j++){
      if(input[i]<input[j]){
        let tg = input[i];
        input[i] = input[j];
        input[j] = tg;
      }
    }
  }
  return input;
}

module.exports = sort

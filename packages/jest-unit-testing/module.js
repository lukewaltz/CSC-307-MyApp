function div (a, b){
    return a / b;
  }

  // module.js
  function sum(a, b) {
    return a + b;
  }
  
  function containsNumbers(text){
    for (let i = 0; i < text.length; i++) {
     if (!isNaN(text.charAt(i)))
      return true;
    }
    return false;
  }

  /* 
  spaces are represented by '0' 
  thinks that any string with spaces contains numbers
  */

export default {sum, div, containsNumbers};
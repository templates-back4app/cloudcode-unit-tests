//In cloud/main.js

var cloudFunctions = require("./functions"); //Parse 2.X
/* @Parse 3.X
  var cloudFunctions = require("./functions3-x");
*/

/* It's necessary to insert the Parse Instance in our code,
because at local context not is referenced.*/

Parse.Cloud.define("registerUser",  cloudFunctions.registerUser(Parse));

Parse.Cloud.beforeSave("infoEmployee", cloudFunctions.infoEmployee(Parse));
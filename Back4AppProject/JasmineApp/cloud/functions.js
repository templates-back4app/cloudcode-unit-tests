//In cloud/functions.js

module.exports.registerUser = function(Parse){
    return function (request, response){
      var params = request.params; //Parameters received
  
      var infoEmployee = Parse.Object.extend("infoEmployee"); //Store Information      
  
      var userCreated = new Parse.User({
        "email" : params.email,
        "username": params.username,
        "password" : params.password
      })
  
      //Save relation
      userCreated.save().then((updatedUser) => {
        var information = new infoEmployee({
          "position"   : params.position,
          "department" : params.department,
          "workShift"  : params.shift,
          "user" : updatedUser
        });
        return information.save();
      }).then((info) => response.success(info))
        .catch((e) => {
          response.error(e.message);
        })
    }
}
  
module.exports.infoEmployee = function(Parse){
    return function (request, response){
      var req = request.object;
  
      if (!req.get("position") || !req.get("department") || !req.get("workShift")) {
        response.error("Missing params! The required parameters are: position, department. workShift");
      } else {
        response.success();
      }
    }
}
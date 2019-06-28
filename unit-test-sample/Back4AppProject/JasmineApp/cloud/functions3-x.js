//In cloud/functions.js

module.exports.registerUser = function(Parse){
    return async(request) =>{
        let params = request.params; //Parameters received  
        let infoEmployee = Parse.Object.extend("infoEmployee"); //Store Information      
  
        let userCreated = new Parse.User({
            "email" : params.email,
            "username": params.username,
            "password" : params.password
        })
  
        //Save relation
        try {
            let result = await userCreated.save();
            
            let information = new infoEmployee({
                "position"   : params.position,
                "department" : params.department,
                "workShift"  : params.shift,
                "user" : result
            });

            return information.save();
        } catch (e) {
            return e.message;
        }
    }
}
  
module.exports.infoEmployee = function(Parse){
    return async (request) =>{
      var req = request.object;
  
      if (!req.get("position") || !req.get("department") || !req.get("workShift")) {
        throw new Error("Missing params! The required parameters are: position, department. workShift");
      } else {
        return;
      }
    }
}
//build signup and login asychronous functions for validating and stroring
const userService=require('./service');
const jwt=require('jsonwebtoken');
module.exports={
    signup:async(req)=>{
    try{
        var emailCheck=await userService.findByEmail(req.email);
        //console.log(emailCheck);
        var userCheck=await userService.findByUsername(req.username);
        //console.log(userCheck);
        if( emailCheck && userCheck )
            {
                //console.log("I am here");
                return 0;
            }
        else
        {
            //console.log(req);
            var user=await userService.create(req);
            //console.log(user);
            return 1;
        }
    } catch(err){
        return err;
    }
    },
    login:async(req)=>{
        try{
            const user=await userService.findByUsername(req.username);

            if( !(user))
                {
                    return "user is incorrect";
                }
            if(!(await userService.comparePassword(user.password,req.password)))  
                {
                    return "Incorrect Login details";
                }
            else
                return "user logged In Successfully";
                    
        }catch(err){
          
          return err;
            
        }
    },
};
const userService=require('./service');
const jwt=require('jsonwebtoken');
module.exports={
    signup:async(req)=>{
    try{
        
        if( await userService.findByEmail(req.email) &&  await userService.findByUsername(req.username))
            {
                
                return "username and email exists";
            }
        
            const user=userService.create(req);
            //console.log(user);
             
            //console.log(token);
            return "user registered successfully";
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
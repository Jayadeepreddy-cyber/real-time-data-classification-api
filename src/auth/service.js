//validating and storing user credentials into database
const users=require('../models/user');
const bcrypt=require('bcrypt');
module.exports={
    findByEmail:async(email)=>{
        return   await users.findOne({email}).catch(error => console.error(error));;
    },
    findByUsername:async(username)=>{
        return  await users.findOne({username}).catch(error => console.error(error));;
    },
    create:async(data)=>{
        //password Encryption
        data.password=bcrypt.hashSync(data.password,10);
        return await users.create(data).catch(error => console.error(error));;
    },
    isUsernameExists: async(username)=>{
        return await users.exists({username});
    },
    isEmailExists: async(email)=>{
        return await users.exists({email});
    },
    comparePassword: async(userPassword,password)=>{
        const isCompared=bcrypt.compareSync(userPassword,password);
        return isCompared;
    }
};
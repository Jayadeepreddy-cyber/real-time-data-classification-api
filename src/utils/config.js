
const dotenv=require('dotenv');
dotenv.config();
module.exports={
 endpoint: process.env.API_URL,
 login_port: process.env.LOGIN_PORT,
 signup_port:process.env.SIGNUP_PORT,
 secretkey: process.env.JWT_SECRET_KEY,

};
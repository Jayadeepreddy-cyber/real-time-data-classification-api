const port=8080
const express = require('express');
const app = express();
const checkGrammar=require('../../grammar');
const jwt=require('jsonwebtoken');
const userController=require('../auth/controller');
const classify  =require("../../classification");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/livestream_db').then(()=>{
   console.info('database connected successfully'); 
}).catch((err)=>{
    console.error(`there was an error connecting to the database. Err: ${err}`)
    process.exit(1);
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
  })
app.use(bodyParser.urlencoded({ extended: true })); 
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/',(req,res)=>{
    const status = {
      "Status": "Running"
   };
   res.send(status);
});
app.post('/signup',(req,res)=>{
        const user = req.body;
        try{
          //Add user details to database
          var result=userController.signup(user);
          
          
          const token=jwt.sign({username:user.username},process.env.JWT_SECRET_KEY);
          //res=JSON.stringify(res);
          //ws.send(res);
          if(result)
          {
            res.send({
                "message":"User Registered Successfully",
                "token":token
            })
            

          }
          else
          {
            res.send({"message":"User and email exists"});


          }
          
          

        }
        catch(error)
        {
            console.log(error);
          res.send({"message":"Incomplete user details"});

        }
});
app.post('/login',(req,res)=>{
    try{
        //const token = req.headers.authorization;
        //const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        const message="Your token has been successfully verified";
        const body=req.body;
        //console.log(body);
        //console.log('received: %s', body);
        try {
            
            //console.log(message.input);
            result=checkGrammar(body.input);
            if(result)
              {
                var output=classify(body.input);
                result=output;

              }
            else
            {
              result="The parser could not parse the string due to invalid format";
            }
            
            
            // 
            //ws.send(result);

          } 
          catch(error)
          {
            console.log(error);
            result="Error in classifying input";
          }
          response={
            "message":message,
            "result":result

          };
          res.status(200).json(response);
          
          
      }
      catch(error)
      {
        console.log(error);
        res.send({"message":"No token in the header/Invalid Token"});
      }
      

      
      
      //connection is up, let's add a simple simple event
      

            
          //log the received message and send it back to the client
          //ws.send(`Hello, you sent -> ${message}`);
          
     

})
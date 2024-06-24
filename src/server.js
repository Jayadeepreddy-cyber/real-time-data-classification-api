// server.js
// Real-time Data classification API 
const {login_port}=require('./utils/config');
const {signup_port}=require('./utils/config');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const jwt=require('jsonwebtoken');
const app = express();
const checkGrammar=require('./utils/grammar');
const userController=require('./auth/controller');
const classify  =require("./utils/classification");
const mongoose = require('mongoose');
// Database connection setup
mongoose.connect('mongodb://127.0.0.1:27017/livestream_db').then(()=>{
   console.info('database connected successfully'); 
}).catch((err)=>{
    console.error(`there was an error connecting to the database. Err: ${err}`)
    process.exit(1);
})
//initialize a simple http server

//initialize the WebSocket server instance
function startServer()
{
  signup();
  login();
}
//signup takes username, email passwords verifies it in the database making sure it is new and sends a token helps in logging in.
function signup()
{
  const server = http.createServer(app);
  const wss = new WebSocket.Server({server:server,path:"/signup"});
  wss.on('connection', (ws) => {
      ws.send("Enter User details: name,email,password");
      ws.on('message', (message) => {
        message=JSON.parse(message);
        try{
          //Add user details to database
          var res=userController.signup(message);
          //console.log(res);
          
          const token=jwt.sign({username:message.username},process.env.JWT_SECRET_KEY);
          //res=JSON.stringify(res);
          //ws.send(res);
          if(res)
          {
            ws.send("User Registered Successfully");
            ws.send(token);

          }
          else
          {
            ws.send("User and email exists");


          }
        }
        catch(error)
        {
          ws.send("Incomplete user details");
        }
      });


  });
  server.listen(signup_port, () => {
    console.log(`Signup-Server started on port ${signup_port} :)`);
});

}
// login takes token as headers verifies it with secret key and proceeds for classification
function login()
{
      const server = http.createServer(app);
      const wss = new WebSocket.Server({server:server,path:"/login"});
      wss.on('connection', (ws,req) => {
      console.log("New Client logged In");

      console.log(`Number of clients logged In are ${wss.clients.size}`);
      try{
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        ws.send("Your token has been successfully verified");
      }
      catch(error)
      {
        console.log(error);
        ws.close(1000,"No token in the header/Invalid Token");
      }
      //connection is up, let's add a simple simple event
      ws.on('message', (message) => {
          //log the received message and send it back to the client
          //ws.send(`Hello, you sent -> ${message}`);
          message=JSON.parse(message);
          console.log('received: %s', message["input"]);
          try {
            
            //console.log(message.input);
            res=checkGrammar(message.input);
            if(res)
              {
                var result=classify(message.input);
                ws.send(result);
              }
            else
            {
              ws.send("The parser could not parse the string due to invalid format");
            }
    
          } 
          catch(error)
          {
            console.log(error);
            ws.send("Invalid input");
          }
          
          
      });

      
  });
  server.listen(login_port, () => {
    console.log(`Login-Server started on port ${login_port} :)`);
});


}

startServer();


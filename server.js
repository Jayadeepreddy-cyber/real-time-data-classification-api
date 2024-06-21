// server.js
const {login_port}=require('./config');
const {signup_port}=require('./config');
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const jwt=require('jsonwebtoken');
const { type } = require('os');
const app = express();
const parser=require('./parser');
const userController=require('./auth/controller');
const classify  =require("./classification");
const mongoose = require('mongoose');
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

function login()
{
      const server = http.createServer(app);
      const wss = new WebSocket.Server({server:server,path:"/login"});
      wss.on('connection', (ws,req) => {
      console.log("New Client Connected");

      console.log(`Number of clients connected are ${wss.clients.size}`);
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
            res=parser(message.input);
            if(res)
              {
                var result=classify(message.input);
                ws.send(result);

              }
            else
            {
              ws.send("The parser could not parse the string due to invalid format");
            }
            
            
            // 
            //ws.send(result);

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
function signup()
{
  const server = http.createServer(app);
  const wss = new WebSocket.Server({server:server,path:"/signup"});
  wss.on('connection', (ws,req) => {
      ws.send("Enter User details: name,email,password");
      ws.on('message', (message) => {
        message=JSON.parse(message);
        try{
          //Add user details to database
          res=userController.signup(message);
          //console.log(res);
          
          const token=jwt.sign({username:message.username},process.env.JWT_SECRET_KEY);
          //res=JSON.stringify(res);
          //console.log(res);
          ws.send("User Registered successfully");
          ws.send(token);
          
          

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

startServer();


/*
app.get("/status",(req,res)=>{
  const status = {
    "Status": "Running"
 };
 res.send(status);
});

app.get("/signup",(req,res)=>{
  const wss = new WebSocket.Server("https://127.0.0.1/signup");
  console.log("server for signup");
  wss.on('connection', (ws,req) => {
    console.log("New Client Connected");
    ws.send("signup");
  })


});
*/
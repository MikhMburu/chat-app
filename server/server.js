const path = require("path");
const http = require("http");
const express = require("express");
const port = process.env.PORT || 3000;
const socketIO = require("socket.io");
const {generateMessage,generateLocationMessage} = require("./utils/message");

const publicPath = path.join(__dirname,"../public");
// console.log(publicPath);
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//..define our express static folder
app.use(express.static(publicPath));

io.on("connection",(socket)=>{
    console.log("New user connected. . .");

    socket.emit("newMessage", generateMessage("Admin","Welcome to the Chat App. . ."));
    socket.broadcast.emit("newMessage", generateMessage("Admin","New User joined. . ."));
    //listening
    socket.on("createMessage",(msg, callback)=>{
        console.log("\nNew Message:\n",JSON.stringify(msg, undefined, 2));
        io.emit("newMessage",generateMessage(msg.from, msg.text));
        callback();        
    });

    // ..listening for geolocation information from user
    socket.on("createLocationMessage", (pin)=>{
        io.emit("newLocationMessage", generateLocationMessage("Admin",pin.longitude, pin.latitude));
    });
    
});

server.listen(port,()=>{
    console.log(`Chat app is up and running on port ${port}`);
})
const path = require("path");
const http = require("http");
const express = require("express");
const port = process.env.PORT || 3000;
const socketIO = require("socket.io");
const {isRealString} = require("./utils/validation");
const {generateMessage,generateLocationMessage} = require("./utils/message");
const {Users} = require("./utils/users");


const publicPath = path.join(__dirname,"../public");

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var userList = new Users();

//..define our express static folder
app.use(express.static(publicPath));

io.on("connection",(socket)=>{
    console.log("New user connected. . .");
    
    //------------USER JOINS-------------------------------
    socket.on("join", (params,callback)=>{
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback("Name and/or room name are required");            
        }
        socket.join(params.room);
        userList.removeUser(socket.id);
        userList.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUsersList",userList.getUserList(params.room));
        socket.emit("newMessage", generateMessage("Admin",`Welcome to the ${params.room} Chat Room. . .`));
        socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin", `${params.name} joined ${params.room} Chat room...`));
    })

    //-------------LISTEN TO MESSAGE FROM USER----------------------
    socket.on("createMessage",(msg, callback)=>{        
        io.emit("newMessage",generateMessage(msg.from, msg.text));
        callback();        
    });

    //-------------LISTEN FOR GEOLOCATION INFO FROM USER---------------
    socket.on("createLocationMessage", (pin)=>{
        io.emit("newLocationMessage", generateLocationMessage("User",pin.longitude, pin.latitude));
    });

    //------------------USER LEAVES THE CHAT ROOM--------------------
    socket.on("disconnect",()=>{
        console.log("User disconnected");
        var removedUser = userList.removeUser(socket.id);

        if(removedUser){
            io.to(removedUser.room).emit("newMessage",generateMessage("Admin", `${removedUser.name} left the chat room`));
            io.to(removedUser.room).emit("updateUsersList", userList.getUserList(removedUser.room));
        }
        // socket.broadcast.to(pa.room).emit("newMessage",generateMessage("Admin", `${removedUser} left the chat room`));
        // socket.broadcast.to(params.room).emit("updateUsersList",userList.getUserList(params.room));
    });

    
});

server.listen(port,()=>{
    console.log(`Chat app is up and running on port ${port}`);
})
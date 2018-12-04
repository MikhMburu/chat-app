const path = require("path");
const http = require("http");
const express = require("express");
const port = process.env.PORT || 3000;
const socketIO = require("socket.io");

const publicPath = path.join(__dirname,"../public");
// console.log(publicPath);
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

//..define our express static folder
app.use(express.static(publicPath));

io.on("connection",(socket)=>{
    console.log("New user connected. . .");

    // socket.on("disconnect", () => {
    //     console.log("Client disconnected. . ");
    // })
    // socket.emit("newEmail",{
    //     from: 'michael n',
    //     message: "this is a message"
    // });
    // socket.on("createEmail",(newEmail)=>{
    //     console.log("\nYou've got mail: \n",JSON.stringify(newEmail, undefined, 2));
    // });
    socket.emit("newMessage",{
        from: "Server",
        text: "This is a message from the server. . .",
        createdAt: new Date().toTimeString()
    });
    socket.on("createMessage",(msg)=>{
        console.log("\nNew Message:\n",JSON.stringify(msg, undefined, 2));
    });
});

server.listen(port,()=>{
    console.log(`Chat app is up and running on port ${port}`);
})
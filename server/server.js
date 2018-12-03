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

    socket.on("disconnect", () => {
        console.log("Client disconnected. . ");
    })
});

server.listen(port,()=>{
    console.log(`Chat app is up and running on port ${port}`);
})
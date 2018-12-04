var socket = io();

socket.on('connect', function(){
    console.log("connected to server. . .");
    socket.emit("createMessage",{
        to: "cathymburu@gmail.com",
        text: "Hi, there's a bash on saturday. Come hungry!!"
    });
})
// socket.on("disconnect", function(){
//     console.log("You have been disconnected from server. . .");
// });

// socket.on("newEmail", function(email){
//     console.log("YOu've got mail\n",email);
// });

// socket.emit("createMessage",{
//     from: "Michael",
//     text: "I did it. The new chat app coming up."
// });

socket.on("newMessage", function(newMsg){
   console.log("\nMessage:\n"+newMsg.text+"\nSent at:\n "+newMsg.createdAt);
})
var socket = io();

socket.on('connect', function(){
    console.log("connected to server. . .");    
})

socket.on("newMessage", function(newMsg){
//    console.log("\nMessage:\n"+newMsg.text+"\nSent at:\n "+newMsg.createdAt);
   var li = jQuery("<li></li>");
   li.text(`${newMsg.from} : ${newMsg.text}`);
   jQuery("#messages").append(li);
})
socket.on("createMessage",function(){
    console.log(JSON.stringify(msg, undefined, 2));
})

socket.on("disconnect", function(){
    console.log("User disconnected. . .");
})

socket.on("newLocationMessage", function(message){
    var li = jQuery("<li></li>");
    var a = jQuery("<a target='_blank'>My current location</a>");
    li.text(`From : ${message.from}: `);
    a.attr('href',message.url);
    li.append(a);
    jQuery("#messages").append(li);
}, function(){

});

jQuery('#message-form').on("submit", function(event){
    var messageTextBox = jQuery([name = message]);
    event.preventDefault();
    socket.emit("createMessage", {
        from: "Michael",
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val("");
    });
});

var myLocation = jQuery("#my-location");
myLocation.on("click", function(){
    if(!navigator.geolocation){
        return alert("Sorry, geolocation not supported by your browser");
    }
    myLocation.attr("disabled", "disabled").text("Sending. . . .");
    navigator.geolocation.getCurrentPosition(function(position){
        myLocation.removeAttr("disabled").text("Send Location");
        socket.emit("createLocationMessage", {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
    }, function(){
        myLocation.removeAttr("disabled").text("Send Location");
        alert("Unable to get your location");
    });
});
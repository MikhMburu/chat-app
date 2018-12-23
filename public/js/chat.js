var socket = io();

socket.on('connect', function(){
    // console.log("connected to server. . ."); 
    var params = jQuery.deparam(window.location.search);
    socket.emit("join",params, function(err){
        if(err){
            alert(err);
            window.location.href = "/"
        }else{
            console.log("No error");
        }
    })  
})

function scrollToBottom(){
    //Selectors
    var messages = jQuery("#messages");
    var newMessage = messages.children("li:last-child");
    //Heights
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){       
        messages.scrollTop(scrollHeight);
    }
}
socket.on("newMessage", function(newMsg){
    var formattedTime = moment(newMsg.createdAt).format("h:mm a");
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        text: newMsg.text,
        from: newMsg.from,
        createdAt: formattedTime
    });
    jQuery("#messages").append(html);
    scrollToBottom();
})
socket.on("createMessage",function(){
    console.log(JSON.stringify(msg, undefined, 2));
})

socket.on("disconnect", function(){
    console.log("User disconnected. . .");
    
});

socket.on("updateUsersList", function(users){
    // console.log("Users List: ", users);
    var ul = jQuery("<ul></ul>");
    users.forEach(function(user){
        ul.append(jQuery("<li></li>").text(user));
    });
    jQuery("#Users").html(ul);
});

socket.on("newLocationMessage", function(message){
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    
    jQuery("#messages").append(html);
    scrollToBottom();
}, function(){

});

jQuery('#message-form').on("submit", function(event){
    var messageTextBox = jQuery([name = message]);
    event.preventDefault();
    socket.emit("createMessage", {        
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
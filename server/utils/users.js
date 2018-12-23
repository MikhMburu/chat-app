const _ = require("lodash");
class Users{
    constructor(){
        this.user = [];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.user.push(user);
        return user;
    };
    removeUser(id){
        var user = this.getUser(id);
        if(user){
            this.user =  this.user.filter((user)=> user.id !== id);
        }
        return user;
    }; 
    getUser(id){
        return this.user.filter((user)=> user.id === id)[0];
    };
    getUserList(room){
        var filteredUsers = this.user.filter((user)=>user.room === room);
        var namesArray = filteredUsers.map((user)=>user.name);
        return namesArray;
    };
    
}

module.exports = {Users};
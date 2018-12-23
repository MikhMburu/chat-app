const expect = require("expect");
const {Users} = require("./users");

var users;
beforeEach(()=>{
    users = new Users();
    users.user = [{
        id: "10001",
        name: "Kennedy",
        room: "Medication"
    },{
        id: "10002",
        name: "Michael",
        room: "Coders"
    },{
        id: "10003",
        name: "Larry",
        room: "Medication"
    },{
        id: "10004",
        name: "Catherine",
        room: "Medication"
    }];
});

describe("Users", () =>{
    it("should add a new user. . .", ()=>{
        var users = new Users();
        var user = {
            id: "10005",
            name: "Kennedy",
            room: "Medication"
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.user).toEqual([user]);
    });

    it("should return names from Medication", ()=>{
        var userList = users.getUserList("Medication");

        expect(userList).toEqual(["Kennedy", "Larry", "Catherine"]);
    });
    it("should return names from Coders", ()=>{
        var userList = users.getUserList("Coders");

        expect(userList).toEqual(["Michael"]);
    });
    it("should remove a user", ()=>{
        var userID = "10002";
        var user = users.removeUser(userID);

        expect(user.id).toEqual(userID);
        expect(users.user.length).toEqual(3);
    });
    it("should get a user from Users", ()=>{
        var userID = "10004";
        var user = users.getUser(userID);

        expect(user.id).toEqual(userID);
    });   
});
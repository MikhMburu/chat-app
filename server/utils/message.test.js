var expect = require("expect");

var {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", ()=>{
    it("should generate correct message object. . .", ()=>{
        var from = "Michael";
        var text = "This is a test";
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe("generateLocationMessage", () => {
    it("should generate the correct url given the coordinates. . .", () => {
        var from = "Mike";
        var longitude = 48;
        var latitude = 97;
        var url = `https://www.google.com/maps?q=97,48`;
        var message = generateLocationMessage(from,longitude,latitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});
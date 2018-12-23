const expect = require("expect");
const {isRealString} = require("./validation");

// isRealString:
//     -should reject non-string values
//     -should reject strings with spaces only
//     -should allow strings with non-space characters

describe("isRealString", ()=>{
    it("should reject non-string values",()=>{
        var res = isRealString(975);
        expect(res).toBe(false);
    });
    it("should reject strings with spaces only",()=>{
        var res = isRealString("    ");
        expect(res).toBe(false);
    });
    it("should allow strings with non-space characters",()=>{
        var res = isRealString("   Minutes  ");
        expect(res).toBe(true);
    });
});


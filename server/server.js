const path = require("path");
const express = require("express");
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname,"../public");
// console.log(publicPath);
const app = express();

//..define our express static folder
app.use(express.static(publicPath));


app.listen(port,()=>{
    console.log(`Chat app is up and running on port ${port}`);
})
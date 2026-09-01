const express = require('express');
const app = express()
app.get("/",(req,res)=>{
    res.send("Hi this is yes");
})
app.listen(3000);
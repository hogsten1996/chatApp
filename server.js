const express = require("express");
const app = express();
const PORT =8081;

const cors = require('cors');
app.use(cors());

const client = require('./db/client');
client.connect();

app.get('/', (req,res)=>{
    res.send("Hello there!")
})

app.use('/api', require('./api/'));

app.listen(PORT, ()=>{
    console.log('On port'+PORT)
})

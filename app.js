const express = require('express');
const app = express();
const router=require('./routes/index.js')
app.use(express.json())
app.use(router)
module.exports=app
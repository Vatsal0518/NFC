
const express = require("express");// express requiring
const app = express(); // app to use express functions
app.use(express.json());// incomming request to convert it to json format
const cors = require('cors');// platform change or local host 3000 runnning react can access only 3000 , to use another localhost request
app.use(cors())
const studentRouter = require('./src/routes/routes')// routes
const userRouter = require('./src/login_signup/routes')
app.use(studentRouter);
app.use(userRouter)
require('./src/connection_mongo/connections')




app.listen(8000,()=>{console.log("port started on 8000 :)")})
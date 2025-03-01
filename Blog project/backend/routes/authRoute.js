const express=require('express');

const routes=express.Router();
const { loginUser, registerUser, dummyApi, allUser } = require('../controller/AuthController');
const { verifytoken, authorizerole } = require('../middleware/Auth');
    routes.post('/login',loginUser)
    routes.post('/register',registerUser)
    routes.get('/dummyapi',verifytoken,dummyApi)
    routes.get('/adminalluser',verifytoken,authorizerole(['admin','manager']),allUser)
module.exports=routes;
const express = require('express');
const routes = express.Router();
const { loginUser, registerUser, dummyApi, allUser } = require('../controller/AuthController');
const { verifytoken, authorizerole } = require('../middleware/Auth');

const multer = require('multer');
const storage = multer.diskStorage({});
const upload = multer({ storage: storage });

routes.post('/register', upload.single('userimage'), registerUser);
routes.post('/login', loginUser);
routes.get('/dummyapi', verifytoken, dummyApi);
routes.get('/adminalluser', verifytoken, authorizerole(['admin', 'manager']), allUser);

module.exports = routes;

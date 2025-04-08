const express = require('express');

const routes = express.Router();
const { authorizerole, verifytoken } = require('../middleware/Auth');

routes.use('/', require('./authRoute'))
routes.use('/admin', verifytoken, authorizerole(['admin']), require('./AdminRoute'))
module.exports = routes;
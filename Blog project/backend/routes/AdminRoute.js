const express = require('express');

const routes = express.Router();
const { allUser } = require('../controller/AuthController');
const { deleteUser, viewProfile, getAdminProfile } = require('../controller/AdminController');
routes.get('/alluser',allUser)
routes.delete('/deleteuser',deleteUser)
routes.get('/viewprofile',getAdminProfile)
module.exports = routes;

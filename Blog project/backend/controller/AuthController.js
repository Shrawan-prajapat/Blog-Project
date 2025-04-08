const UserModel = require('../models/UserModel')
let JWT = require('jsonwebtoken')
let cloudinary = require('cloudinary')
const registerUser = async (req, res) => {
    try {
        const { name, email, password, gender, city, contact } = req.body;
        if (!name || !email || !password || !gender || !city || !contact || !req.file) {
            return res.status(400).send({
                success: false,
                message: 'Please fill all the fields'
            })
        }
        let imageRecord = await cloudinary.uploader.upload(req.file.path)
        let user = await UserModel.create({
            name: name,
            email: email,
            password: password,
            gender: gender,
            city: city,
            contact: contact,
            image: imageRecord?.secure_url,
            public_id: imageRecord?.public_id
        })
        return res.status(200).send({
            success: true,
            message: "User is created successfully...",
            user
        });


    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await UserModel.findOne({ email: email });
        if (!user || user.password != password) {
            return res.status(401).send({
                success: false,
                message: 'Invalid email or password'
            })
        }
        let token = await JWT.sign({ payload: user }, process.env.SECRET_KEY, { expiresIn: '3hr' });
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            token: token,
            user: user
        })
    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        })
    }

}
const dummyApi = (req, res) => {


    res.send(req.user?.name)
}
const allUser = async (req, res) => {
    try {
        let users = await UserModel.find({});
        return res.status(200).send({
            success: true,
            message: "Users found successfully",
            users: users
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            error: err
        });
    }
};


module.exports = {
    loginUser, registerUser, dummyApi, allUser
}

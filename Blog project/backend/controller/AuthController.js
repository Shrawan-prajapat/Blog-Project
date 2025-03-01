const UserModel=require('../models/UserModel')
let JWT=require('jsonwebtoken')
const registerUser = async (req, res) => {
    try {
       

        const { name, email, password } = req.body;
        if (!password) {
            return res.status(400).send({ success: false, message: "Password is required" });
        }

        let user = new UserModel({
             name: name, 
             email: email, 
             password: password});
        let data = await user.save();

        return res.status(200).send({
            success: true,
            message: "User is created successfully...",
            data
        });
      

    } catch (err) {
        return res.status(501).send({
            success: false,
            error: err
        });
    }
};

const loginUser=async(req,res)=>{
    try {
       const{email,password}=req.body;
       let user=await UserModel.findOne({email:email});
       if(!user || user.password !=password){
        return res.status(401).send({
            success:false,
            message:'Invalid email or password'
        })
       }
       let token=await JWT.sign({payload:user},"blog",{expiresIn:'3hr'});
       return res.status(200).send({
        success:true,
        message:'Login Successfully',
        token:token,
        user:user
       })
    } catch (err) {
        return res.status(501).send({
            success:false,
            error: err
        })
    }
}
const dummyApi=(req,res)=>{

    
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


module.exports={
    loginUser,registerUser,dummyApi,allUser
}
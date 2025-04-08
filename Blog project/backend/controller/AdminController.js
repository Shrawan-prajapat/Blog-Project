const User=require('../models/UserModel');
const cloudinary=require('cloudinary').v2;
const allUser=async(req,res)=>{
    try{
        let users=await User.find(role="admin")
      
        res.status(200).send({
            success:true,
            message:"All users fetched succsessfully",
            users
        })
    }
    catch(err){
        res.status(501).send({
            success:false,
            error:err
        })
    }
}
const deleteUser=async(req,res)=>{
   try{
      let userid=req.query.userid; 
      const oldimage=await User.findById(userid);
     
      if(oldimage.public_id){
          await cloudinary.uploader.destroy(oldimage.public_id);
          await User.findByIdAndDelete(userid);
          res.status(200).send({
              success:true,
              message:"User deleted successfully"
          })
      }
      
   }
    catch(err){
        res.status(501).send({
            success:false,
            error:err
        })
    }
}


const getAdminProfile = async (req, res) => {
    try {
        const admin = await User.findOne({ role: 'admin' }); // Assuming you have a role field
        if (!admin) {
            return res.status(404).send({
                success: false,
                message: "Admin profile not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Admin profile fetched successfully",
            admin,
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            error: err.message,
        });
    }
};

const editProfile=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const admin=await User.findById(req.user._id);
        if(!users){
            return res.status(404).send({
                success:false,
                message:"Admin not found"
            })
        }
        
        await admin.save();
        res.status(200).send({
            success:true,
            message:"Profile updated successfully",
            users
        })
    }
    catch(err){
        res.status(501).send({
            success:false,
            error:err
        })
    }
}

module.exports={
    allUser,deleteUser,getAdminProfile
}
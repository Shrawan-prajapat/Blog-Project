const JWT=require('jsonwebtoken')
const verifytoken=(req,res,next)=>{
    let token=req.headers.authorization;
    if(!token){
        return res.status(401).send({
            success:false,
            message:'No token Provided'
        })
    }
    let newToken=token.slice(7);
    JWT.verify(newToken,process.env.SECRET_KEY,(err,decode)=>{
        if(err){
            return res.status(500).send({
                success:false,
                message:'Failedd to Authenticate token.'
            })
        }
        req.user=decode.payload;
        return next();
    })
    
    
}
//role base authentication
const authorizerole=(roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req?.user?.role)){
              return res.status(403).send({
                success:false,
                  message:'You are not authorized to access this resource.'
               })
              
        }
        return next();
    }
 
    
}
module.exports={
    verifytoken ,authorizerole
}
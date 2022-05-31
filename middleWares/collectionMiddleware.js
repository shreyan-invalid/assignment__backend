
const grantCollectionAccess= async (req, res, next) => {
    try{
        if(req.user._id === req.body.user.id){
            next();
        }else{
            return res.status(401).json({
                error: "You are not authorised",
            });
        }
    }catch(error){
        next(error);
    }
}


module.exports={
    grantCollectionAccess
}
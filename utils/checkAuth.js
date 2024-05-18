import jwt from 'jsonwebtoken'

export default (req,res,next)=>{

    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    // console.log(token);
    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = {
                id: decoded._id,
                role: decoded.role,
            };
            // console.log(req.userId)
            next();
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: 'Error occurred'});
        }

    }
    else {
        res.status(401).send('Not authorized');
    }

}
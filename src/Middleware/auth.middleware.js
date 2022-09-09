const auth = (req,res,next)=>{
    if(req.url.startsWith("/products")){
        if(req.headers.token === "1234"){
            next();
        }
        else{
            res.status(401).send("Not Authorized");
        }
    }else{
        next();
    }
}

module.exports = auth;
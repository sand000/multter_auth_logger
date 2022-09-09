const logger = (req,res,next)=>{
    console.log("before",req.url);

    if(req.url === "/"){
        res.send("under Attack");
    }
    else{
        next();
    }
}
module.exports=logger;
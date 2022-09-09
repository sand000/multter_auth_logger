// import
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const compression = require("compression");
const loggerMiddleware = require("./Middleware/logger.middleware");
const productsRoutes = require("./Routes/products.route")

// create server
const app = express();
app.use(cors());
app.use(compression());
// app.use(multer());
// allows us to read JSON body
app.use(express.json());

const storage = multer.diskStorage({
     destination: function (req, file, cb) {
          cb(null,`${__dirname}/./uploads`);
     },
     filename: function (req, file, cb) {
          cb(null, file.originalname);
     },
})

const upload = multer({storage:storage});

app.use("/products",productsRoutes);

app.get("/a", (req,res)=>{
     res.send("node server")
});
app.get("/b", (req,res)=>{
     
     res.send("node server")
});

app.post("/file",upload.single("avatar"),(req,res)=>{
   res.send("file uploaded")
});

app.post("/files",upload.array("photos"),(req,res)=>{
     res.send("files uploaded")
  })


// listen on port
app.listen(8080, ()=>{
     
     console.log("Starting on: http://localhost:8080")
})
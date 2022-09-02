// import
const express = require("express");


//  import fs
const fs = require("fs");
const { brotliDecompress } = require("zlib");
// read file
const dbFile = fs.readFileSync(`${__dirname}/../db.json`,{encoding:"utf-8"});
// parsing 
const db = JSON.parse(dbFile);
let products = db.products
let updateDb = (updatedProducts)=>{
    fs.writeFileSync(`${__dirname}/../db.json`,JSON.stringify(updatedProducts),{encoding:"utf-8"})
}


// create server
const app = express();

// allows us to read JSON body
app.use(express.json());



// GET /
app.get("/", (req,res)=>{
      res.send("Home");
})

// GET /products
app.get("/products", (req,res)=>{
    res.send(products);
})

// GET /products/:id
app.get("/products/:id", (req,res)=>{
    let {id} = req.params;
    let product= products.find((p)=> p.id === Number(id));
    if(!product){
        res.status(404).send(`No product foun with id: ${id}`);
    }
    res.send(product);
})

// DELETE /products/:id
app.delete("/products/:id", (req,res)=>{
    let {id} = req.params;
    let index = products.findIndex((p)=> p.id === Number(id));
    products.splice(index,1);
    updateDb({...db, products})
    res.send(products);
})

// POST /products
app.post("/products", (req,res)=>{
   products.push(req.body);
   updateDb({...db, products})
   res.send("data added successfully ");
})

// PATCH /products
app.patch("/products/:id", (req,res)=>{
    let {id} = req.params;
    products = products.map((p)=>{
        if( p.id === Number(id)){
            return {
                ...p, ...req.body
            }
        }
        else return p;      
    });
    updateDb({...db, products})
    res.send("Data updated sucessfully")
})

// listen on port
app.listen(8000, ()=>{
     console.log("Starting on: http://localhost:8000")
})
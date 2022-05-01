const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mydata.zdc33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{    
        await client.connect();
        const productsCollection = client.db('dValley').collection('products');

        app.get('/products', async(req, res)=>{
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        app.get('/products/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await productsCollection.findOne(query);
            res.send(result);
        });

        app.post('/products', async(req, res)=>{
            const newProducts = req.body;
            const result = await productsCollection.insertOne(newProducts);
            res.send(result);
        })

        // delete
        app.delete('/products/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        })

        // update
        app.get('/products/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await productsCollection.findOne(query);
            res.send(result);
        });
        app.put('/products/:id', async(req, res)=>{
            const id = req.params.id;
            const updateProduct = req.body;
            const filter = {_id: ObjectId(id)};
            const options = {upsert: true};
            const updateDoc = {
                $set: {
                    quantity: updateProduct.quantity
                }
            };
            const result = await productsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        app.get('/myProducts', async(req, res)=>{
            const email = req.query.email;
            const query = {email: email};
            const cursor = productsCollection.find(query);
            const myProducts = await cursor.toArray();
            res.send(myProducts);
        })

    }
    finally{

    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("running server");
  });
  
  app.listen(port, () => {
    console.log("Server is running");
  });
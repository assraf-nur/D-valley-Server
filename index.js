const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://nur:1010778711@mydata.zdc33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
            // const newKey = await productsCollection.find(filter, {fields: {'quantity':1}}).toArray(function(err, docs){
            //     if (err) throw err;
            //     console.log(docs);
            //  });
            const result = await productsCollection.updateOne(filter, updateDoc, options);
            res.send(result);
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
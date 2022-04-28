const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

        app.get('/products', async(rwq, res)=>{
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
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
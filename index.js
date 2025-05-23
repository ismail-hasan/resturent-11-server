const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 5000

// midleWare 
app.use(cors())
app.use(express.json())

// Resturent_Website
// fzyeENI917dOe903
console.log(process.env.DB_PASS)

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gbi1i.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const resturentDB = client.db('resturentWebsite').collection('resturentMenu')
const ReviewsDB = client.db('resturentWebsite').collection('menuReviews')

async function run() {
    try {



        // front end api 
        app.get('/menu', async (req, res) => {
            const result = await resturentDB.find().toArray()
            res.send(result)
        })
        app.get('/reviews', async (req, res) => {
            const result = await ReviewsDB.find().toArray()
            res.send(result)
        })




        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send("resturent server is runnisng")
})

app.listen(port, () => {
    console.log(`server running port is ${port}`)
})
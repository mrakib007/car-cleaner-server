const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb').ObjectID;
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
const port = 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m99d8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("carCleaner").collection("services");
  const adminCollection = client.db('carCleaner').collection('admin');

  app.post('/addService',(req,res) =>{
    const newProduct = req.body;
    serviceCollection.insertOne(newProduct).then((result)=>{
        res.send(result.insertedCount > 0);
    });
});

app.get('/services',(req,res)=>{
    serviceCollection.find().toArray((err,items)=>{
        res.send(items);
    });
});

app.post('/addAdmin',(req,res)=>{
    const admin = req.body;
    adminCollection.insertOne(admin).then((result) =>{
        res.send(result.insertedCount > 0);
    });
});

app.get('/',(req,res)=>{
    res.send('hello from database');
});

});


app.listen(process.env.PORT || port);
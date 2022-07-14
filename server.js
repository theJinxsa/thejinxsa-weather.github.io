var projectData ={};

const express = require("express");
const app = express();

const port = 23344;
const host = '127.3.3.2';

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


const cors= require('cors');
app.use(cors());

app.use(express.static('website'));

app.listen(port,host,()=>{
    console.log(`server running on ${host} : ${port}`);
})


app.post("/postData",(req,res)=>{
    projectData = req.body ;
    res.send(projectData).status(200).end();
})

app.get("/getData",(req,res)=>{
    res.send(projectData).status(200).end();
})
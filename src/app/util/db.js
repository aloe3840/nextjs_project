import { MongoClient } from "mongodb";
const url = "mongodb+srv://admin:admin@cluster0.uzji6pa.mongodb.net/";
const option = {useNewUrlParser: true, useUnifiedTopology: true};
let connectDB;

if(process.env.NODE_ENV === 'development'){
    if(!global._mongo){
        global._mongo = new MongoClient(url, option).connect();
    }
    connectDB = global._mongo;
}else{
    connectDB = new MongoClient(url, option).connect();
}

export{connectDB}          
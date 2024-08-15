const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Cayala_1607",
    database:"bibliotecadb_ptig"
});

app.listen(3001, ()=>{
    console.log("corriendo en el puerto 3001")
})
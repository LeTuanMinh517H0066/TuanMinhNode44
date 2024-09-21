// B1: import express
import express from "express";
// import pool from "./db.js";
// import {OK, INTERNAL_SERVER} from "./const.js"
import rootRoutes from "./src/routes/root.router.js";
import cors from "cors";

// B2: create object express
const app = express();

// them middleware der doc data json
app.use(express.json());

// them middleware cors để frontend có thể call api tới backend
app.use(cors());

// import rootRoutes
app.use(rootRoutes)

// B3: define port cho BE chay
// params 1: define port BE
// params 2: callback function

app.get(`/`, (req, res) => {
    res.send("Hello node44");

})

app.get('/test',(req, res) => {
    res.send("test api");
})


// demo get query tu URL
app.get(`/test-query`, (req, res) => {

    let query = req.query;
    res.send(query);
    // res.send("Hello node44");

})

// demo get header from request
app.get(`/test-header`, (req, res) => {

    let headers = req.headers;
    res.send(headers);
    // res.send("Hello node44");

})



app.listen(8085, () => {
    console.log("Server is starting with port 8085");
})


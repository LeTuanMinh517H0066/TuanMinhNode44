// B1: import express
import express from "express";

// B2: create object express
const app = express();

// them middleware der doc data json
app.use(express.json());

// B3: define port cho BE chay
// params 1: define port BE
// params 2: callback function

app.get(`/`, (req, res, next) => {
    res.send("Hello node44");

})

app.get('/test',(req, res) => {
    res.send("test api");
})

// demo get params tu URL
app.post('/users/:id/:hoTen',(req, res) => {
    let params = req.params;
    let {id,hoTen} = params;
    let body = req.body;

    console.log('12334');
    
    res.send({
        id,
        hoTen,
        body
    });
});

// demo get query tu URL
app.get(`/test-query`, (req, res, next) => {

    let query = req.query;
    res.send(query);
    // res.send("Hello node44");

})

// demo get header from request
app.get(`/test-header`, (req, res, next) => {

    let headers = req.headers;
    res.send(headers);
    // res.send("Hello node44");

})


app.listen(8080, () => {
    console.log("Server is starting with port 8080");
})


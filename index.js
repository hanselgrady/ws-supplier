var express = require("express");
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "willywangky",
    password: "willywangky",
    database: "wssupplier"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database");
});

var app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/list", (req, res, next) => {
    con.query("SELECT namabahan, harga FROM bahan;", function(errno, result) {
        if (errno) throw errno;
        res.json(result);
    });   
});


app.get('/buy/:fund([0-9]{1,})/:id([0-9]{1,})/:amount([0-9]{1,})', function(req, res) {
    var fund = req.params.fund;
    var id = req.params.id;
    var amount = req.params.amount;
    con.query("SELECT harga FROM bahan WHERE idbahan = " + req.params.id + ";", function(errno, result) {
        if (errno) throw errno;
        console.log(result);
        var price = result[0].harga;
        console.log(price);
        var new_fund = fund - price * amount;
        if (new_fund >= 0) {
            res.json({result: 'success', value: new_fund});
        } else {
            res.json({result: 'failed', value: -new_fund});
        }
    });
});

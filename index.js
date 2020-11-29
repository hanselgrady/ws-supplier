var express = require("express");
var mysql = require("mysql");
var cors = require("cors");

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

app.listen(7000, () => {
    console.log("Server running on port 7000");
});

app.get("/list", cors(), (req, res, next) => {
    con.query("SELECT namabahan, harga FROM bahan;", function(errno, result) {
        if (errno) {
            res.json({result: 'query_error', value: 0})
            return
        };
        res.json(result);
    });   
});


app.get('/buy/:fund([0-9]{1,})/:id([0-9]{1,})/:amount([0-9]{1,})', cors(), function(req, res) {
    var fund = req.params.fund;
    var id = req.params.id;
    var amount = req.params.amount;
    con.query("SELECT harga FROM bahan WHERE idbahan = " + req.params.id + ";", function(errno, result) {
        if (errno || !result[0]) {
            res.json({result: 'query_error', value: 0})
            return
        };
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

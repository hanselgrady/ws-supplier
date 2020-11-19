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

var app = express();app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.get("/list", (req, res, next) => {
    con.query("SELECT namabahan, harga FROM bahan;", function(errno, result) {
        if (errno) throw errno;
        res.json(result);
    });   
});
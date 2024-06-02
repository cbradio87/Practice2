const express = require('express');
const mysql = require('mysql');
const app = express();
const pool = dbConnection();
 
app.set("view engine", "ejs");
app.use(express.static("public"));
 
//routes
app.get("/dbTest", async function(req, res){
 let sql = `SELECT * FROM dbTest
 WHERE username = ?`;
 let params = ['Joe'];
 let rows = await executeSQL(sql, params);
 res.send(rows);
});//dbTest
 
//functions
async function executeSQL(sql, params){
 return new Promise (function (resolve, reject) {
   pool.query(sql, params, function (err, rows, fields) {
     if (err) throw err;
     resolve(rows);
   });
 });
}
 
//values in red must be updated
function dbConnection(){
  const pool  = mysql.createPool({
     connectionLimit: 10,
     host: "w3epjhex7h2ccjxx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
     user: "mf1w8x4ok0oya478",
     password: "d5to7gvvgirxdz4x",
     database: "dmw6rn12umewvz16"
  });
  return pool;
}
 
//start server
app.listen(3000, () => {
 console.log("Express server running...")
} )

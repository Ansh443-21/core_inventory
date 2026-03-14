const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.static("../"))
app.use(bodyParser.json())

const db = new sqlite3.Database("inventory.db")

// ============================
// CREATE TABLES
// ============================

db.serialize(()=>{

db.run(`
CREATE TABLE IF NOT EXISTS users(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
email TEXT UNIQUE,
password TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS products(
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
sku TEXT,
category TEXT,
quantity INTEGER
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS receipts(
id INTEGER PRIMARY KEY AUTOINCREMENT,
product_id INTEGER,
supplier TEXT,
quantity INTEGER,
date TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS deliveries(
id INTEGER PRIMARY KEY AUTOINCREMENT,
product_id INTEGER,
customer TEXT,
quantity INTEGER,
date TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS history(
id INTEGER PRIMARY KEY AUTOINCREMENT,
product_id INTEGER,
action TEXT,
quantity INTEGER,
date TEXT
)
`)

db.run(`
CREATE TABLE IF NOT EXISTS transfers(
id INTEGER PRIMARY KEY AUTOINCREMENT,
product_id INTEGER,
from_location TEXT,
to_location TEXT,
quantity INTEGER,
date TEXT
)
`)

})

// ============================
// SIGNUP
// ============================

app.post("/signup",(req,res)=>{

const {name,email,password}=req.body

if(!name || !email || !password){
return res.status(400).json({message:"Missing fields"})
}

db.run(
"INSERT INTO users(name,email,password) VALUES(?,?,?)",
[name,email,password],
function(err){

if(err){
return res.status(500).json({message:"Email already exists"})
}

res.json({message:"User created"})

})

})

// ============================
// LOGIN
// ============================

app.post("/login",(req,res)=>{

const {email,password}=req.body

db.get(
"SELECT * FROM users WHERE email=? AND password=?",
[email,password],
(err,row)=>{

if(err){
return res.status(500).json(err)
}

if(!row){
return res.status(401).json({message:"Invalid login"})
}

res.json(row)

})

})

// ============================
// PRODUCTS
// ============================

app.get("/products",(req,res)=>{

db.all("SELECT * FROM products",(err,rows)=>{

if(err){
return res.status(500).json(err)
}

res.json(rows)

})

})

app.post("/products",(req,res)=>{

const {name,sku,category,quantity}=req.body

db.run(
"INSERT INTO products(name,sku,category,quantity) VALUES(?,?,?,?)",
[name,sku,category,quantity],
function(err){

if(err){
return res.status(500).json(err)
}

res.json({id:this.lastID})

})

})

// ============================
// RECEIPTS
// ============================

app.post("/receipts",(req,res)=>{

const {product_id,supplier,quantity}=req.body

db.run(
"INSERT INTO receipts(product_id,supplier,quantity,date) VALUES(?,?,?,datetime('now'))",
[product_id,supplier,quantity]
)

db.run(
"INSERT INTO history(product_id,action,quantity,date) VALUES(?,?,?,datetime('now'))",
[product_id,"RECEIPT",quantity]
)

db.run(
"UPDATE products SET quantity = quantity + ? WHERE id=?",
[quantity,product_id]
)

res.json({message:"Receipt recorded"})

})

// ============================
// DELIVERIES
// ============================

app.post("/deliveries",(req,res)=>{

const {product_id,customer,quantity}=req.body

db.run(
"INSERT INTO deliveries(product_id,customer,quantity,date) VALUES(?,?,?,datetime('now'))",
[product_id,customer,quantity]
)

db.run(
"INSERT INTO history(product_id,action,quantity,date) VALUES(?,?,?,datetime('now'))",
[product_id,"DELIVERY",quantity]
)

db.run(
"UPDATE products SET quantity = quantity - ? WHERE id=?",
[quantity,product_id]
)

res.json({message:"Delivery recorded"})

})

// ============================
// TRANSFERS
// ============================

app.post("/transfers",(req,res)=>{

const {product_id,from_location,to_location,quantity}=req.body

db.run(
"INSERT INTO transfers(product_id,from_location,to_location,quantity,date) VALUES(?,?,?,?,datetime('now'))",
[product_id,from_location,to_location,quantity]
)

db.run(
"INSERT INTO history(product_id,action,quantity,date) VALUES(?,?,?,datetime('now'))",
[product_id,"TRANSFER",quantity]
)

res.json({message:"Transfer recorded"})

})

// ============================
// HISTORY
// ============================

app.get("/history",(req,res)=>{

db.all(`
SELECT history.*, products.name
FROM history
LEFT JOIN products ON history.product_id = products.id
ORDER BY date DESC
`,(err,rows)=>{

if(err){
return res.status(500).json(err)
}

res.json(rows)

})

})

// ============================
// DASHBOARD
// ============================

app.get("/dashboard",(req,res)=>{

const stats={}

db.get("SELECT COUNT(*) as totalProducts FROM products",(err,row)=>{
stats.totalProducts=row.totalProducts

db.get("SELECT COUNT(*) as lowStock FROM products WHERE quantity < 10",(err,row)=>{
stats.lowStock=row.lowStock

db.get("SELECT COUNT(*) as receipts FROM receipts",(err,row)=>{
stats.receipts=row.receipts

db.get("SELECT COUNT(*) as deliveries FROM deliveries",(err,row)=>{
stats.deliveries=row.deliveries

res.json(stats)

})

})

})

})

})

// ============================
// SERVER
// ============================

app.listen(3000,()=>{
console.log("Server running on http://localhost:3000")
})
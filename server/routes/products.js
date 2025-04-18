const express=require('express')
const router=express.Router()
const db=require('../db')

router.get('/',async(req,res)=>{
    try{
        const products=await db.query('SELECT * FROM products')
        res.json(products.rows)
    }catch(error){
        console.log("Error fetching products",error.message)
        res.json({message:"Error fetching products"})
    }
})

router.post('/',async(req,res)=>{
    const {name,price}=req.body
    try{
        await db.query('INSERT INTO products (name,price) VALUES ($1,$2)',[name,price])
        res.json({message:'Product Added Successfully'})
    }catch(error){
        console.log("Error inserting product",error.message)
        res.json({message:"Error inserting product"})
    }
})

router.put('/:id',async(req,res)=>{
    const {id}=req.params
    const {name,price}=req.body
    try{
        await db.query('UPDATE products SET name=$1,price=$2 WHERE id=$3',[name,price,id])
        res.json({message:"Products Upadted Successfully"})
    }catch(error){
        console.log("Error update product details",error.message)
        res.json({message:"Error update product details"})
    }
})

router.delete('/:id',async(req,res)=>{
    const {id}=req.params
    try{
        await db.query('DELETE FROM products WHERE id=$1',[id])
        res.json({message:'Product Deleted Successfully'})
    }catch(error){
        console.log("Error deleting the product",error.message)
        res.json({message:"Error deleting the product"})
    }
})

module.exports=router
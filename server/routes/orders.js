const express=require('express')
const router=express.Router()
const db=require('../db')

router.post('/',async(req,res)=>{
    const {productName,quantity,customerName,contact,address}=req.body
    try{
        const result=await db.query(
            "INSERT INTO orders (product_name,quantity,customer_name,contact,address,status) VALUES ($1,$2,$3,$4,$5,'Pending') RETURNING *",
            [productName,quantity,customerName,contact,address]
        )
        res.json({order:result.rows[0]})
    }catch(error){
        console.log("Error placing order",error.message)
        res.json({message:"Error placing order"})
    }
})

router.get('/:id',async(req,res)=>{
    const {id}=req.params
    try{
        const result=await db.query('SELECT * FROM orders WHERE id=$1',[id])
        res.json(result.rows[0])
    }catch(error){
        console.log("Error fetching order details",error.message)
        res.json({message:"Error fetching order details"})
    }
})

module.exports=router
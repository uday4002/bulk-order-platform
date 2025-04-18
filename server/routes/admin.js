const express=require('express')
const router=express.Router()
const db=require('../db')

router.get('/orders',async(req,res)=>{
    try{
        const result=await db.query('SELECT * FROM orders ORDER BY created_at DESC')
        res.json(result.rows)
    }catch(error){
        console.log("Error fetching orders",error.message)
        res.json({message:"Error fetching orders"})
    }
})

router.put('/orders/:id/status',async(req,res)=>{
    const {id}=req.params
    const {status}=req.body
    try{
        await db.query('UPDATE orders SET status=$1 WHERE id=$2',[status,id])
        res.json({message:"Order Status Updated Successfully"})
    }catch(error){
        console.log("Error update order status",error.message)
        res.json({message:"Error update order status"})
    }
})

module.exports=router
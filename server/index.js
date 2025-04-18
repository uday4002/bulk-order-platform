const express=require('express')
const cors=require('cors')
const app=express()
app.use(cors())
app.use(express.json())
require('dotenv').config()

const productRoutes=require('./routes/products')
const orderRoutes=require('./routes/orders')
const adminRoutes=require('./routes/admin')

app.use('/api/products',productRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/admin',adminRoutes)

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))
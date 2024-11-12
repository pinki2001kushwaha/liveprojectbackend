const express=require('express')
const cors=require('cors')




const app=express()
app.use(cors())

const port=9000
app.use(express.json());

const {routejwt}=require("../server/route/jwt")
app.use("/",routejwt)

app.listen(port,()=>{
    console.log(`server is running ${port}`)
})



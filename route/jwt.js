const express=require("express")
const { signup,login }=require("../controller/jwt")

const routejwt=express.Router();

routejwt.post("/usersignup",signup)
routejwt.post("/userlogin",login)
module.exports={routejwt}

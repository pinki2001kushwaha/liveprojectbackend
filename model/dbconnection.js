const pg=require('pg')

const con=new pg.Client({
    user:'postgres',
    host:'localhost',
    password:'7697',
    database:'e_com_project',
    port:5432,
})
con.connect((err)=>{
    if(err){
        console.log("pgadmin is not connected.............",err)
        
    }
    else{
        console.log("pgadmin connected.................")
    }
})
module.exports=con
const Router=require("express").Router()
const {checkSchema,validationResult}=require("express-validator")
const {empSchema}=require("../schemas/employeeSchema")
let emps=[
    {
        id:1,
        name: "Garrick",
        email: "Garrick@example.com",
        department: "Management",
        role: "Admin"
    },
  {
    id:2,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    department: "IT",
    role: "Frontend Developer"
  },
  {
    id:3,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    department: "HR",
    role: "Backend Developer"
  },
  {
    id:4,
    name: "Carol Lee",
    email: "carol.lee@example.com",
    department: "Sales",
    role: "Content Strategist"
  },
  {
    id:5,
    name: "David Kim",
    email: "david.kim@example.com",
    department: "Finance",
    role: "HR Manager"
  },
  {
    id:6,
    name: "Eva Martinez",
    email: "eva.martinez@example.com",
    department: "Development",
    role: "Account Executive"
  }
];
let id=emps.length
Router.get("/",(req,res)=>{
    res.send({emps:emps})
})
Router.get("/employee/:id",(req,res)=>{
    const {id}=req.params
    const finduser=emps.find((user)=>user.id==id)
    if(!finduser){
        return res.send({success:false,msg:"No user Found with this id"})
    }
    res.send({success:true,emps:emps})
})
Router.post("/",checkSchema(empSchema),(req,res)=>{
    try {
        const validateresult=validationResult(req)
        if(!validateresult.isEmpty()){
            return res.send({success:false,error:validateresult.errors[0].msg})
        }
       
        const userdata=req.body
        const email=userdata.email
        const finduser=emps.find((emp)=>emp.email===email)
        if(finduser){
            return res.send({success:false,msg:"A user already exists with this email"})
        }
        emps.push({id:++id,...userdata})

        res.send({success:true,emps:emps})
    } catch (error) {
        console.log(error)
        res.send({msg:"A Internal Server Error"})
    }

})
Router.put("/:id",checkSchema(empSchema),(req,res)=>{
    try {
        const validationresult=validationResult(req)
        if(!validationresult.isEmpty()){
            return res.send({success:false,errors:validationresult.errors[0].msg})
        }
        const {id}=req.params
        const updatedata=req.body
        const findemployee=emps.findIndex((user)=>user.id==id)
        if(findemployee<0){
            return res.send({success:false,msg:"No user Found"})
        }
        emps[findemployee]={id:id,...updatedata}
        res.send({success:true,emps:emps})
    } catch (error) {
        console.log(error)
        res.send("An Internal Server error",error)
    }
})
Router.get('/search',(req,res)=>{
    const {q}=req.query
    const finduser=emps.filter((user)=>user.name.toLowerCase().includes(q.toLowerCase()))
    res.send({success:true,emps:finduser})
})
Router.delete("/:id",(req,res)=>{
    const {id}=req.params
    const finduser=emps.find((user)=>user.id==id)
    if(!finduser){
        return res.send({success:false,msg:"No user Found with this id"})
    }
    emps=emps.filter((user)=>user.id!=id)
    res.send({success:true,emps:emps})
})
module.exports=Router




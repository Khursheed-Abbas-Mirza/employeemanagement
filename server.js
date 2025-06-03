const express=require("express")
const app=express()
const jwt=require("jsonwebtoken")
const cors=require("cors")
const employees=require("./routes/employes")
const path=require("path")
const passport=require("./auth")
app.set('view engine', 'ejs'); // Tells Express to use EJS
app.set('views', './views');
app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use(cors())
app.use("/api",employees)
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","index.html"))
})
app.get("/auth",passport.authenticate("hubspot"))
app.get("/callback",passport.authenticate('hubspot', { session: false }),(req,res)=>{
const user=req.user

res.render("user",{user,name:user.email.split('@')[0]})
})
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.listen(3000,(req,res)=>{
    console.log("Server is running on port http://localhost:3000")
})
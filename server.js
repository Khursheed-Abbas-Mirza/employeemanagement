const express=require("express")
const app=express()
const cors=require("cors")
const employees=require("./routes/employes")
const path=require("path")

app.use(express.json())
app.use(express.static(path.join(__dirname,"public")))
app.use(cors())
app.use("/api",employees)

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","index.html"))
})

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.listen(3000,(req,res)=>{
    console.log("Server is running on port http://localhost:3000")
})
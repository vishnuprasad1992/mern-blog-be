const express = require("express");
const connectDb = require("./DB/connect");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path =require("path");
const cors=require("cors");

connectDb();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;


app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use("/images",express.static(path.join(__dirname,"/images")));


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    },
});

const upload = multer({storage:storage});

app.post("/api/upload",upload.single("file"),(req,res)=>{
    res.status(200).json("File has been uploaded successfully")
})

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postsRoute);
app.use("/api/category", categoryRoute);

app.listen(port,()=> console.log(`server running on http://localhost:${port}`))

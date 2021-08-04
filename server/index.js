import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import postRoutes from './routes/index.js'
import userRoutes from './routes/user.js'
dotenv.config()
const app = express()
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/posts',postRoutes)
app.use('/user',userRoutes)
app.get('/',(req,res)=>{
    res.send("Not able to reach the rout")
})

const PORT  = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true , useFindAndModify: false})
.then(()=>(    
    app.listen(PORT,()=>{
        console.log(`Server is listening on http://localhost:${PORT}`)
    })
)).catch((err)=>(
    console.log(err)
)
)
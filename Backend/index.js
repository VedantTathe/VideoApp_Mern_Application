const express = require('express');
const cors = require("cors");
const userRoutes = require('./routes/user.routes')
const videoRoutes = require('./routes/video.routes')
const cookieParser = require('cookie-parser');
const app = express();

require('dotenv').config();

const connectToDB = require('./config/db')
connectToDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: ['http://localhost:5173', 'https://videoappbyvedant.vercel.app'],
    credentials: true
}))
app.use('/users',userRoutes);
app.use('/videos',videoRoutes);
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('hi');
});

// app.listen(process.env.PORT || 3000,()=>{
//     console.log("Server is Running");
// })

module.exports = app;
require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const http = require('http')
const cloudinary = require('cloudinary').v2;

const app = express();
const server = http.createServer(app); 
const PORT = process.env.PORT || 5000

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(cors());
app.use(express.json());

const adminrouter = require('./Router/Admin')
const categoryrouter = require('./Router/category')
const productrouter = require('./Router/product')

app.use('/uploads', express.static('uploads'));
app.use('/category',categoryrouter)
app.use('/admin',adminrouter)
app.use('/product',productrouter)
app.get('/',(req,res)=>{
    res.send("Hello !")
})

mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('✅ Database Connection is ready...');
    server.listen(PORT, () => {        
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });

http.createServer
const express = require('express');
const Product = require('../model/Product');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage });

router.get('/', async(req,res)=>{
    try{
        const product = await Product.find()
        if(!product){
           return res.status(500).json({success : false})
        }
        res.send(product)
    }catch(error){
        res.status(500).json({success:false , error:error.message})
    }
})

router.post('/create', async(req,res)=>{
    try{
        let product = new Product({
            Id : req.body.Id,
            Name:req.body.Name,
            Description:req.body.Description,
            Status:req.body.Status,
            price:req.body.price,
            category:req.body.category,
        })

        product = await product.save()
        return res.status(201).json({message:"product added Succesfully !", product})
    }
catch(err){
    return res.status(500).json({error: err.message})
}
})

router.delete('/:id', async(req,res)=>{
    const deleteproduct = await Product.findByIdAndDelete(req.params.id)
    if(!deleteproduct){
        return res.status(404).json({message:"this is product not defind"})
    }
    return res.status(200).json({message:"product deleted"})
})

router.get('/:id', async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).json({message:"product not defind"})
        }
        return res.status(200).json({status:true, product})
    }catch(err){
        return res.status(500).json({error:err.message})
    }
})

router.put('/:id', async(req,res)=>{
    try{
        let updateData = {
            Id:req.body.Id,
            Name:req.body.Name,
            Description:req.body.Description,
            Status:req.body.Status,
            price:req.body.price,
            category:req.body.category
        };
        const product = await Product.findByIdAndUpdate(req.params.id , updateData , {new:true})
        
        if(!product){
            return res.status(404).json({message:"update failed!", status:false})
        }
        return res.status(200).json({message:"product update!" , status:true , product})
    }catch(err){
        return res.status(500).json({error:err.message})
    }
})

// router.post('/create', upload.single('profileImage'), async (req, res) => {
//   try {
//     let imgurl = '';

//     if (req.file && req.file.path) {
//       const result = await cloudinary.uploader.upload(req.file.path, { folder: 'product' });
//       imgurl = result.secure_url;
//       fs.unlinkSync(req.file.path);
//     }

//     const product = new Product({
//       Id: req.body.Id,
//       Name: req.body.Name,
//       Description: req.body.Description,
//       Status: req.body.Status,
//       price: req.body.price,
//       category: req.body.category,
//       profileImage: imgurl,
//     });

//     await product.save();
//     return res.status(201).json({ message: 'Product added successfully!', product });
//   } catch (err) {
//     console.error('❌ Backend error in /product/create:', err);
//     return res.status(500).json({ error: err.message });
//   }
// });

// router.put('/:id', upload.single('profileImage'), async(req,res)=>{
// try{
//  let updateData = {
//     Id:req.body.Id,
//     Name:req.body.Name,
//     Description:req.body.Description,
//     Status:req.body.Status,
//     price:req.body.price,
//     category:req.body.category
//  };
//  if(req.file){
//     const result = await cloudinary.uploader.upload(req.file.path,{
//         folder:'product',
//     });
//     updateData.profileImage = result.secure_url;
//     fs.unlinkSync(req.file.path);
//  }

//  const product = await Product.findByIdAndUpdate(req.params.id , updateData , {new:true})

//  if(!product){
//     return res.status(404).json({message:"update failed!", status:false})
//  }
//  return res.status(200).json({message:"product update!" , status:true , product})
// }catch(err){
//     return res.status(500).json({error:err.message})
// }
// })

module.exports = router
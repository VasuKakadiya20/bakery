const express = require('express');
const Admin = require('../model/Admin'); 
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

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


router.get('/', async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/create', upload.single('userimg'), async (req, res) => {
  try {
    let imgurl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'admin',
      });
      imgurl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const admin = new Admin({
      Name: req.body.Name,
      Email: req.body.Email,
      phonenumber: req.body.phonenumber,
      password: req.body.password,
      userimg: imgurl, 
    });

    const savedAdmin = await admin.save();
    res.status(201).json({ message: 'Admin created successfully', admin: savedAdmin });
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async(req,res) =>{
  try{
    const Data = await Admin.findById(req.params.id)
    if(!Data){
      return res.status(404).json({message:"this is data is not"})
    }
    return res.status(200).json({status:true,Data})
  }catch(error){
    console.error("admin fetching error:" ,error)
    return error
  }
})

router.put('/:id', upload.single('userimg'), async (req, res) => {
  try {
    let updateData = {
      Name: req.body.Name,
      Email: req.body.Email,
      phonenumber: req.body.phonenumber,
      password: req.body.password,
    };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'admin',
      });
      updateData.userimg = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updatedAdmin) {
      return res.status(404).json({ message: 'Admin not found', status: false });
    }

    res.status(200).json({ message: 'Admin updated successfully', status: true, admin: updatedAdmin });
  } catch (err) {
    console.error('❌ Error updating admin:', err);
    res.status(500).json({ error: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { Email, password } = req.body;

  try {
    const admin = await Admin.findOne({ Email });
    if (!admin || admin.password !== password) {
      return res.status(404).json({ msg: 'Invalid email or password.' });
    }
    res.status(200).json({ msg: 'Login successful.', admin ,status : 200});
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

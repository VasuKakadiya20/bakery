const express = require('express')
const Category  = require('../model/category')
const router = express.Router()

router.get('/',async(req,res)=>{
    try {
        const categorylist = await Category.find();
        if (!categorylist) {
          return res.status(500).json({ success: false });
        }
        res.send(categorylist);
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
})

router.post('/create',async(req,res)=>{
    try{
        let category = new Category({
            name:req.body.name,
            CategoryID: req.body.CategoryID
        })
          category = await category.save();
    res.status(201).json(category);
    }catch(error){
        console.error(error);
        res.status(500).json({err:error.message})
    }
})

router.delete('/:id',async(req,res)=>{
    const categorydelete = await Category.findByIdAndDelete(req.params.id);
    if(!categorydelete){
        return res.status(404).json({ message: "Category not found!", status: false });
  }
  res.status(200).json({ message: "Category deleted!", status: true });
})

router.get('/:id',async(req,res)=>{
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
})

router.put('/:id',async(req,res)=>{
  try{
    let updateData = {
      name:req.body.name,
      CategoryID:req.body.CategoryID
    };

    const category = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!category) {
          return res.status(404).json({ message: 'Update failed', status: false });
        }
        res.status(200).json({ message: 'Category updated!', status: true, category });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
})

module.exports = router
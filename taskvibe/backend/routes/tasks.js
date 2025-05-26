const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.get('/',auth,async(req,res)=>{
    try{
        const task = await Task.find({userId:req.user.userId}).sort({order:1});
        res.json(task);
    }catch(err){
        res.status(500).json({message:'server error'});
    }
});

router.post('/',auth,async(req,res)=>{
    const{title,description,priority,dueDate} = req.body;
    try{
        const task = new Task({title,description,priority,dueDate,userId:req.user.userId});
        await task.save();
        res.json(task);
    }catch(err){
        res.status(500).json({message:'server error'});
    }
});

router.put('/:id',auth,async (req,res)=>{
    const{title,description,priority,status,dueDate,order} = req.body;
    try{
        const task = await Task.findById(req.params.id);
        if(!task || task.userId.toString() !== req.user.userId){
            return res.status(404).json({message:'Tas not found'});
        }
        task.title = title||task.title;
        task.description = description||task.description;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;
        task.order = order !== undefined ? order:task.order;
        await task.save();
        res.json(task);
    }catch(err){
        res.status(500).json({message:'Server Error'});
    }
});

router.delete('/:id',auth,async(req,res)=>{
    try{
        const task = await Task.findById(req.params.id);
        if(!task || task.userId.toString() !== req.user.userId){
            return res.status(404).json({message:'Task not found'});
        }
        await task.remove();
        res.json({message:'Task deleted'});
    }catch(err){
        res.status(500).json({message:'Server error'});
    }
});

module.exports = router;

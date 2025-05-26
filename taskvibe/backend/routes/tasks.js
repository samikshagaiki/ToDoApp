const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

router.get('/',auth,async(req,res)=>{
    try{
        const task = await Task.find({})
    }catch{

    }
});

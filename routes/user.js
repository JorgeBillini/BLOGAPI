const express = require('express');
const UserApp = express.Router();
const UserService = require('../services/user');
//HELPERS

//get user
UserApp.get('/:id',(req,res)=>{
    const {id} = req.params;
    UserService.read(id)
    .then((user)=>{
        res.json(user);
    },err =>{
    console.log(err);
        res.json({
            message:'something went wrong',
        })
    })
})
//GET ALL user posts
UserApp.get('/:id/post',(req,res)=>{
    const {id} = req.params;
    UserService.getPost(id).then((usersPosts)=>{
        res.json({usersPosts})
    })
    .catch(err=>{
        res.status(404).json({error: err.toString()})
    })
})
// GET SPECIFIC POST
UserApp.get('/:id/post/:post_id',(req,res)=>{
    const {id} = req.params;
    const {post_id} = req.params;
    UserService.getPost(id,post_id)
    .then((post)=>{
        res.json({post})
    },(err)=> res.json({error:err.toString()}))
})

module.exports = { 
    UserApp
}
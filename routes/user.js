const express = require('express');
const UserApp = express.Router();
const UserService = require('../services/user');
const uuidv1 = require('uuid/v1');
//HELPERS
/*
TODO: create function to conver user strings to user ids
*/
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

//GET COMMENTS
UserApp.get('/:id/comments',(req,res)=>{
    const {id} = req.params
    UserService.getComments(id)
    .then((data)=>{
        res.json(data);
    }, err=> res.json({error:err.toString()}))
})
UserApp.get('/:id/comments/:comment_id',(req,res)=>{
    const {id} = req.params
    const {comment_id} = req.params
    UserService.getComments(id,comment_id)
    .then(comment => res.json(comment), err => res.json({error: err.toString()}))
})
UserApp.post('/login',(req,res)=>{
    const {username} = req.body;
    const {password} = req.body;
    // pull out user check if password and username match, grant a token lol
    UserService.read(username).
    then(user=>{
        if (username === user.username && password === user.password){
            token = uuidv1();
            UserService.update(user.username,user.email,user.password,user.id,token)
            .then(()=>{
                res.json({message:'login successfull'})
            },err=>{res.json({message:'login failed, try again',
        error:err.toString()})})
        }

    },err=> res.json({error: error.toString()}))
})
module.exports = { 
    UserApp
}
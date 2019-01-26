const express = require('express');
const CommentApp = express.Router();
const UserService = require('../services/user');
const {CommentService} = require('../services/comment');
const uuidv1 = require('uuid/v1');
/*
❌ POST /comment
✅ GET /comment/:comment_id
❌ PUT /comment/:comment_id
❌ DEL /comment/:comment_id
*/
CommentApp.post('/',(req,res)=>{
    const {user,title,body,post_id} = req.body
    UserService.read(user)
    .then((user)=>{
    
        if (!user.token){
            res.json({message:'not authorized'})
            return;
        }
        let author = user.id
        CommentService.create(author,post_id,title,body)
        .then(()=>{
            res.json({message:`sent ${body} to post #${post_id}`})
        },err =>res.json({message:err.toString()}))

    },err=> res.json({error:'user not found'}))
})

CommentApp.get('/:id',(req,res)=>{
    const {id} = req.params;
    CommentService.read(id)
    .then(data=>{
        res.json(data)
    },err =>{
        res.json({err:err.toString()})
    })
})

module.exports = { 
    CommentApp
}
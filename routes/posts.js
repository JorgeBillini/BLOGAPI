const express = require('express');
const PostApp = express.Router();
const {PostService} = require('../services/posts');
const uuidv1 = require('uuid/v1');
/*
❌ POST /post
✅ GET /post/:post_id
❌ PUT /post/:post_id
❌ DEL /post/:post_id
✅ GET /post/:post_id/comments
✅ GET /post/:post_id/comments/:comment_id
*/

PostApp.get('/:id',(req,res)=>{
    const {id} = req.params;
    PostService.read(id)
    .then((post)=>{
        res.json(post);
    },err=>{
        res.json({error:err.toString()})
    })
})
PostApp.get('/:id/comments',(req,res)=>{
    const {id} = req.params;
    PostService.getComments(id)
    .then((data)=>{
        res.json(data);
    },err=>{
        res.json({error:err.toString()})
    })
})

module.exports = {
    PostApp,
}
const express = require('express');
const CommentApp = express.Router();
const {CommentService} = require('../services/comment');
const uuidv1 = require('uuid/v1');
/*
❌ POST /comment
✅ GET /comment/:comment_id
❌ PUT /comment/:comment_id
❌ DEL /comment/:comment_id
*/

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
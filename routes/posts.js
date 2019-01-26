const express = require('express');
const PostApp = express.Router();
const {PostService} = require('../services/posts');
const UserService = require('../services/user')
const uuidv1 = require('uuid/v1');
/*
❌ POST /post **
✅ GET /post/:post_id **
❌ PUT /post/:post_id
❌ DEL /post/:post_id
✅ GET /post/:post_id/comments **
✅ GET /post/:post_id/comments/:comment_id **
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
PostApp.get('/:id/comments/:comment_id',(req,res)=>{
    const {id} = req.params; 
    const {comment_id} = req.params;
    PostService.getComments(id,comment_id)
    .then((data)=>{
        res.json({data})
    },err=>{
        res.json({message:err.toString()})
    })
})
PostApp.post('/',(req,res)=>{
    const {user,title,body} = req.body;
    UserService.read(user)
    .then(user=>{
        if(!user.token){
            res.json('Not authorized');
        }
        const author = user.id;
        PostService.create(author,title,body)
        .then(()=>{
            res.json({message:'success'})
        },err=>{
            res.json({message:err.toString()})
        })
    },err=>{
        res.json({error:err.toString()})
    })
})
PostApp.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {user,title,newTitle,newBody} = req.body;
    UserService.read(user)
    .then((user)=>{
        let author = user.id;
        if (!user.token){
            res.json({message:'not authorized'});
        }
        if (!newTitle && !newBody){
            res.json({message:'please insert title or body'})
        }
        else if (newTitle && !newBody){
            PostService.update(newTitle,null,author,id)
            .then((data)=>{
                res.json({message:'success'})
            },err=>{res.json({error:err.toString()})})
        }
        else if (!newTitle && newBody){
            PostService.update(title,newBody,author,id)
            .then((data)=>{
                res.json({message:'success'})
            },err=>{res.json({error:err.toString()})})

        }
        else PostService.update(newTitle,newBody,author,id)
        .then((data)=>{
            res.json({message:'success'})
        },err=>{res.json({error:err.toString()})})
    },err=>{
        res.json({err:err.toString()})
    })

})

module.exports = {
    PostApp,
}
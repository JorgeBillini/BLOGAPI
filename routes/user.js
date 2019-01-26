const express = require('express');
const UserApp = express.Router();
const UserService = require('../services/user');
const uuidv1 = require('uuid/v1');
//HELPERS
/*
TODO: create function to conver user strings to user ids
*/
//get user
UserApp.get('/:username',(req,res)=>{
    const {username} = req.params;
    UserService.read(username)
    .then((user)=>{
        res.json(user);
    },err =>{
    console.log(err);
        res.json({
            message:'something went wrong',
        })
    })
    .catch(err =>{
        res.json({error: err})
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
// UPDATE a user
UserApp.put('/:username',(req,res)=>{
    // read user , check if it has a valid token
    const {username} = req.params
    const {id,password,email,newUserName,newPassword,newEmail} = req.body;
    // currently our user service is structured so that it's only taking parameters from user, in fact we should
    // be sending out the whole user object -- !to be optimized
    console.log(username);
    UserService.read(username)
    .then((user)=>{
    //add if statements to check what we will be updating(there will be a lot of those, read above)
    if (!user.token){
        res.json({message:'not authorized'})
        return;
    }
    if (user.password !== password){
        res.json({message:'not authorized'})
    }
    else if (!newUserName && !newPassword && !newEmail){
        /* nothing should be updated because there's no new info
        */
       res.json({message:'No updates were made for user'})
    }
    // UPDATE PARAMS ARE username, email, password,id,token IN THAT PARTICULAR ORDER
    else if (user.token === null){
        res.json({message:'you are not authorized to make any changes in this account'})
    }
    else if (newUserName && !newPassword && !newEmail){
        UserService.update(newUserName,email,password,id,user.token)
        .then((data)=>{
            res.json({
                message: `updated user`
            })
        },err=>res.json({
            error: err.toString()
        }))
    }
    else if (!newUserName && newPassword && !newEmail){
        UserService.update(username,email,password,id,user.token)
        .then((data)=>{
            res.json({message:`updated user`});
        },err => {
            res.json({message:`something went wrong`})
        })
    }
    else if (!newUserName && !newPassword && newEmail){
        UserService.update(username,email,newPassword,id,user.token)
        .then((data)=>{
            res.json({message:`updated user`});
        },err => {
            res.json({message:'failed to update'})
        })
    }

},err=> res.json({error:err.toString()}))
})

UserApp.delete('/:username',(req,res)=>{
 const {username} = req.params;
 console.log(username, 'is user')
    UserService.read(username)
    .then(user=>{
        if (user.token === null){
            res.json({message:' youre not authorized'})
            return;
        }
        UserService.delete(user.id)
        .then(()=>{
            res.json({message:'deleted user'})
        },err=>{
            console.log(err)
            res.json({message:'cannot delete'})
        })
    },err=>{
        console.log(err)
        res.json({message:'Error'})
    },(err)=>{
        res.json({message:err.toString()})
    })
})
module.exports = { 
    UserApp
}
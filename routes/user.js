const express = require('express');
const UserApp = express.Router();
const UserService = require('../services/user');

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

module.exports = { 
    UserApp
}
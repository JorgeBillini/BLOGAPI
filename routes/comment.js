const express = require('express');
const CommentApp = express.Router();
const UserService = require('../services/user');
const { CommentService } = require('../services/comment');
const uuidv1 = require('uuid/v1');
/*
❌ POST /comment **
✅ GET /comment/:comment_id **
❌ PUT /comment/:comment_id
❌ DEL /comment/:comment_id **
TODO: this is a rough prototype, a lot of code still needs to be refactored
*/
// CREATE COMMENT
CommentApp.post('/', (req, res) => {
    const { user, title, body, post_id } = req.body
    UserService.read(user)
        .then((user) => {

            if (!user.token) {
                res.json({ message: 'not authorized' })
                return;
            }
            let author = user.id
            CommentService.create(author, post_id, title, body)
                .then(() => {
                    res.json({ message: `sent ${body} to post #${post_id}` })
                }, err => res.json({ message: err.toString() }))

        }, err => res.json({ error: 'user not found' }))
})
// DELETE COMMENT
CommentApp.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { user } = req.body;
    UserService.read(user)
        .then((user) => {
            if (!user.token) {
                res.json({ message: 'not authorized' })
                return;
            }
            CommentService.delete(id)
                .then(() => {
                    res.json({ message: 'successfully deleted comment' })
                }, err => {
                    res.json({ message: 'something went wrong' })
                })
        }, err => res.json({ err: 'user not found' }))
})
//UPDATE COMMENT
CommentApp.put('/:comment_id', (req, res) => {
    const { comment_id } = req.params;
    const { user, title, body, post_id } = req.body;
    UserService.read(user)
        .then((user) => {
            author = user.id
            if (!user.token) {
                res.json({ message: 'not authorized' });
                return
            }
            if (!post_id) {
                res.json({ message: 'please send a valid post' })
            }
            if (!title) {
                CommentService.update(comment_id, null, body, author, post_id)
                    .then(() => {
                        res.json({ message: `Successfully edited comment #${comment_id}` })
                    }, err => { res.json({ message: 'something went wrong' }) })
            }
            else if (!body) {
                CommentService.update(comment_id, title, null, author, post_id)
                    .then(() => {
                        res.json({ message: `Successfully edited comment #${comment_id}` })
                    }, err => { res.json({ message: 'something went wrong' }) })
            }
            else CommentService.update(comment_id, title, body, author, post_id)
                .then(() => {
                    res.json({ message: `Successfully edited comment #${comment_id}` })
                }, err => {
                    res.json({
                        message: 'something went wrong',
                        error: err.toString()
                    })
                })

        }, err => { res.json({ message: 'user not found' }) })
})
// GET COMMENT
CommentApp.get('/:id', (req, res) => {
    const { id } = req.params;
    CommentService.read(id)
        .then(data => {
            res.json(data)
        }, err => {
            res.json({ err: err.toString() })
        })
})

module.exports = {
    CommentApp
}
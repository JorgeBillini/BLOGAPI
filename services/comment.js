const {db} = require('./dbConnect');
const CommentService = {};

CommentService.create = (author,post_id,title,body)=> {
   return db.none('INSERT INTO comments (author,post_id,title,body) VALUES (${author},${post_id},${title},${body});',{author,post_id,title,body});
};

CommentService.read = (id)=> {
   return db.one('SELECT * FROM comments WHERE comments.id=${id};',{id});
};
// Modify
CommentService.update = (username, email, password,id,token) => {
   return db.one('UPDATE users SET username = ${username}, email = ${email}, password = ${password}, token =${token} WHERE id = ${id};', {username, email, password,id,token});
 }
 //modify
CommentService.delete = (id)=> {
   return db.any('DELETE FROM posts WHERE author=${id};DELETE FROM comments WHERE author=${id}; DELETE FROM users WHERE id=${id};',{id:id});
};

CommentService.getPost = (id,post_id) => { 
    if (!post_id){
    return db.any( 'SELECT users.username, posts.title, posts.body FROM users JOIN posts ON users.id = posts.author WHERE users.id =${id};',{id:id})

    }
    else 
    return db.any('SELECT users.username, posts.title, posts.body FROM users JOIN posts ON ${id} = posts.author WHERE posts.id = ${post_id} AND users.id = ${id};',
    {id, post_id})
}

CommentService.getComments = (post_id,comment_id)  => {
    if (!comment_id){
        return db.any('SELECT comments.title, comments.body, comments.author FROM posts JOIN comments ON posts.id = comments.post_id WHERE posts.id =${post_id} AND comments.post_id=${post_id}',{post_id})
    }
    else return db.any('SELECT comments.title, comments.body, comments.author FROM posts JOIN comments ON posts.id = comments.post_id WHERE posts.id = ${post_id} AND comments.post_id = ${post_id} AND comments.id = ${comment_id};',{post_id,comment_id})

}
module.exports = {
    CommentService
}

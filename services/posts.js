const {db} = require('./dbConnect');
const PostService = {};

PostService.create = (author,title,body)=> {
   return db.none('INSERT INTO posts (author,title,body) VALUES (${author},${title},${body});',{author,title,body});
};

PostService.read = (id)=> {
   return db.one('SELECT * FROM posts WHERE posts.id=${id};',{id});
};
// Modify
PostService.update = (newTitle,newBody,author,id) => {
    if (!newBody){
    return db.none('UPDATE posts SET  title = ${newTitle} WHERE author = ${author} AND id=${id};', {newTitle,id,author});
    }
    else if (!newTitle){
    return db.none('UPDATE posts SET body = ${newBody} WHERE author = ${author} AND id=${id}', { newBody,author,id});
    }
   else return db.none('UPDATE posts SET  title = ${newTitle}, body = ${newBody} WHERE author = ${author} AND id=${id}', {newTitle,newBody,author,id});
 }
 //modify
PostService.delete = (id)=> {
   return db.any('DELETE FROM comments WHERE post_id=${id};DELETE FROM posts WHERE id=${id};',{id:id});
};

PostService.getPost = (id,post_id) => { 
    if (!post_id){
    return db.any( 'SELECT users.username, posts.title, posts.body FROM users JOIN posts ON users.id = posts.author WHERE users.id =${id};',{id:id})

    }
    else 
    return db.any('SELECT users.username, posts.title, posts.body FROM users JOIN posts ON ${id} = posts.author WHERE posts.id = ${post_id} AND users.id = ${id};',
    {id, post_id})
}

PostService.getComments = (post_id,comment_id)  => {
    if (!comment_id){
        return db.any('SELECT comments.title, comments.body, comments.author FROM posts JOIN comments ON posts.id = comments.post_id WHERE posts.id =${post_id} AND comments.post_id=${post_id}',{post_id})
    }
    else return db.any('SELECT comments.title, comments.body, comments.author FROM posts JOIN comments ON posts.id = comments.post_id WHERE posts.id = ${post_id} AND comments.post_id = ${post_id} AND comments.id = ${comment_id};',{post_id,comment_id})

}
module.exports = {
    PostService
}

const {db} = require('./dbConnect');
const CommentService = {};

CommentService.create = (author,post_id,title,body)=> {
   return db.none('INSERT INTO comments (author,post_id,title,body) VALUES (${author},${post_id},${title},${body});',{author,post_id,title,body});
};

CommentService.read = (id)=> {
   return db.one('SELECT * FROM comments WHERE comments.id=${id};',{id});
};
// Modify
CommentService.update = (id,title,body,author,post_id) => {
    if (!title){
        return db.none('UPDATE comments SET  body = ${body} WHERE id = ${id} AND author=${author} ;', {id,body,author,post_id});
    }
    else if (!body){
        return db.none('UPDATE comments SET title = ${title},  WHERE id = ${id} AND author=${author} ;', {id,title,author,post_id});
    }
   else return db.none('UPDATE comments SET title = ${title}, body = ${body} WHERE id = ${id} AND author=${author};', {id,title,body,author,post_id});
 }
 //modify
CommentService.delete = (id)=> {
   return db.any('DELETE FROM comments WHERE id=${id}',{id:id});
};


CommentService.getComments = (post_id,comment_id)  => {
    if (!comment_id){
        return db.any('SELECT comments.title, comments.body, comments.author FROM posts JOIN comments ON posts.id = comments.post_id WHERE posts.id =${post_id} AND comments.post_id=${post_id}',{post_id})
    }
    else return db.any('SELECT comments.title, comments.body, comments.author FROM posts JOIN comments ON posts.id = comments.post_id WHERE posts.id = ${post_id} AND comments.post_id = ${post_id} AND comments.id = ${comment_id};',{post_id,comment_id})

}
module.exports = {
    CommentService
}

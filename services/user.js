const {db} = require('./dbConnect');
const UserService = {};

UserService.create = (user)=> {
   console.log(user)
   return db.none('INSERT INTO users (name, email,password) VALUES (${name},${email},${password})',{name:user.name,email:user.email,password:user.password});
};

UserService.read = (username)=> {
   return db.one('SELECT * FROM users WHERE username=${username}',{username:username});
};

UserService.update = (name, email, id) => {
   return db.none('UPDATE users SET name = ${name}, email = ${email} WHERE id = (${id})', {name, email, id});
 }

UserService.delete = (id)=> {
   return db.any('DELETE FROM pets WHERE owner=${id}; DELETE FROM users WHERE id=${id}',{id:id});
};

UserService.getPost = (id,post_id) => { 
    if (!post_id){
    return db.any( 'SELECT users.username, posts.title, posts.body FROM users JOIN posts ON users.id = posts.author WHERE users.id =${id}',{id:id})

    }
    else 
    return db.any('SELECT users.username, posts.title, posts.body FROM users JOIN posts ON ${id} = posts.author WHERE posts.id = ${post_id} AND users.id = ${id}',
    {id, post_id})
}

UserService.getComments = username => {
    return db.any('SELECT * FROM comments JOIN users ON users.username = comment.author WHERE users.username = ${username};',{username})

}
module.exports = UserService;

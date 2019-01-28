const { db } = require('./dbConnect');
const UserService = {};

UserService.create = (user) => {
   console.log(user)
   return db.none('INSERT INTO users (name, email,password) VALUES (${name},${email},${password});', { name: user.name, email: user.email, password: user.password });
};

UserService.read = (username) => {
   return db.one('SELECT * FROM users WHERE username=${username};', { username });
};

UserService.update = (username, email, password, id, token) => {
   return db.one('UPDATE users SET username = ${username}, email = ${email}, password = ${password}, token =${token} WHERE id = ${id};', { username, email, password, id, token });
}

UserService.delete = (id) => {
   return db.any('DELETE FROM posts WHERE author=${id};DELETE FROM comments WHERE author=${id}; DELETE FROM users WHERE id=${id};', { id: id });
};

UserService.getPost = (id, post_id) => {
   if (!post_id) {
      return db.any('SELECT users.username, posts.title, posts.body FROM users JOIN posts ON users.id = posts.author WHERE users.id =${id};', { id: id })

   }
   else
      return db.any('SELECT users.username, posts.title, posts.body FROM users JOIN posts ON ${id} = posts.author WHERE posts.id = ${post_id} AND users.id = ${id};',
         { id, post_id })
}

UserService.getComments = (username, comment_id) => {
   if (!comment_id) {
      return db.any('SELECT users.username, comments.title, comments.body FROM users JOIN comments ON users.id = comments.author WHERE users.id =${username}', { username: username })
   }
   else return db.any('SELECT users.username, comments.title, comments.body FROM users JOIN comments ON users.id = comments.author WHERE users.id =${username} AND comments.id=${comment_id}', { username: username, comment_id: comment_id })

}
module.exports = UserService;

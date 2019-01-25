const pgp = require('pg-promise')({});
const cn = {
   host: 'localhost',
   port: 5432,
   database: 'blog',
   user: 'postgres',
   password: 'newPassword'
};
const db = pgp(cn);

module.exports =  {
    db,
}
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const {UserApp} = require('./routes/user');
const {PostApp} = require('./routes/posts')
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/user',UserApp);
app.use('/posts',PostApp)

app.listen(3000,()=>{
    console.log('app is listening');
})
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const {UserApp} = require('./routes/user');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/user',UserApp);

app.listen(3000,()=>{
    console.log('app is listening');
})
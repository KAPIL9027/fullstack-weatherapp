if(process.env.NODE_ENV !== "production")
{
    require('dotenv').config();
}

const API_Key = process.env.API_KEY;
const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.get('/',async (req,res)=>
{
    const response = await axios("http://ip-api.com/json");
    const q = response.data.city;
    res.render('index.ejs',{q,API_Key});
});

app.get('/search',(req,res)=>
{
    res.render('search.ejs');
});
app.post('/weather',(req,res)=>
{
const {q} = req.body;
console.log(q);
res.render('index.ejs',{q,API_Key});
});
const port = process.env.PORT || 3000;
app.listen(port,()=>
{
    console.log('Server started and Listening on port 3000');
});

const express = require('express');
const hbs =require('hbs');
const fs =require('fs');
var app = express();
hbs.registerPartials(__dirname +'/views/partials');
hbs.registerHelper('curyear',()=>
{
    return new Date().getFullYear()
});
hbs.registerHelper('screamit',(text) =>{
    return text.toUpperCase();
})
app.use(express.static(__dirname +'/html'));
app.use((req,res,next)=>
{
          var now = new Date().toString();
          var log = `${now}:  ${req.method}  ${req.url}`
          console.log(log)
          fs.appendFile('server.log',log +'\n',(err)=>
          {
            if(err)
            {
                console.log('unable to handle file');
            }
          })
          next()
})
app.use((req,res,next)=>
{
    res.render('mang.hbs')
})
app.set('view engine','hbs');
console.log(__dirname);

app.get('/home',(req,res)=>
{
   res.render('home.hbs',{
       wlcmsg:'Hello this is home page',
       
   })
});
app.get('/about',(req,res)=>
{
     res.render('about.hbs', {
         pageTitle : 'About Page',
         
     });
});

app.get('/bad',(req,res) =>
{
      res.send({
        emsg:'unable to find services'
        });
});
app.listen(6600,() =>
{
    console.log('server is up on');
});
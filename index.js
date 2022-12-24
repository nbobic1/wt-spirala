var bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require("express-session");
const app = express();
const path=require('path')
//sesija
app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
 }));
//get zahtjevi
app.get('/predmet.html',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/html/predmet.html'));
});
app.get('/prisustvo.html',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/html/prisustvo.html'));
});
app.get('/prijava.html',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/html/prijava.html'));
});
///////////
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var options = {
    root: path.join(__dirname)
};
//post zahtjevi
app.post('/login',function(req,res){
   let tijelo = req.body;
   fs.readFile(__dirname+"/public/data/nastavnici.json", (err, data) => {
    if (err==null) 
    {
        let unpa= JSON.parse(data);
        let z=0;
        for(let i=0;i<unpa.length;i++)
        {
            bcrypt.hash(tijelo['username'], 10, function(err, hash) {
                if(unpa[i].nastavnik.username==tijelo['username']&&unpa[i].nastavnik.userpassword==hash)
                {
                    res.json({"poruka":"Uspješna prijava"});
                    z=1;
                }
            });
            if(z==1)
            break;
        }
        if(z!=1)
        {
            req.session.username=tijelo['username'];
            res.json({"poruka":"Neuspješna prijava"});
        }
    }
    else 
    res.json({"poruka":"greak u fajlu "+err});
    });
   
});
app.post('/logout',function(req,res){
    if(req.session.username!=null)
    res.json({"poruka":"bio je prijavljen "});
    req.session.username=null;
 });
 

 
app.listen(3000);
var bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require("express-session");
const app = express();
const path=require('path')
const pug = require('pug');
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
app.get('/predmet',(req,res)=>{
  console.log(req.session.username);
    if(req.session.username!=null)
    res.render("predmet", {
        results: true
    }); 
    else
    res.render("predmet", {
        results: false
    }); 
    
});
///////////
app.use(express.static(__dirname+'/public'));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//post zahtjevi
function cbCrypt(z,z1,a,res,req,k)
{
    if(z!=-1&&a)
    {
        z=-1;
        req.session.username=k;
        res.json({"poruka":"Uspješna prijava"});
    }
    else if(z==z1)
    {
        res.json({"poruka":"Neuspješna prijava"});
    }
}
app.post('/login',function(req,res){
   let tijelo = req.body;
   fs.readFile(__dirname+"/public/data/nastavnici.json", (err, data) => {
    if (err==null) 
    {
        let unpa= JSON.parse(data);
        let z=0;
        for(let i=0;i<unpa.length;i++)
        {
            if(unpa[i].nastavnik.username==tijelo['username'])
            bcrypt.compare(tijelo['password'],unpa[i].nastavnik.password_hash, function(err, rje) {
                 if(err==null)
                    {
                        cbCrypt(z,unpa.length,rje,res,req,tijelo['username']);
                    }
            });
            if(z==-1)
            break;
        }
    }
    else 
    res.json({"poruka":"greak u fajlu "+err});
    });
});
app.post('/logout',function(req,res){
    if(req.session.username!=null)
    {
        req.session.username=null;
        res.json({"poruka":"bio je prijavljen "});
    }
    else
    res.json({"poruka":"sve 5"});
     
 }); 
app.listen(3000);
    
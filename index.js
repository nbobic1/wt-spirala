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
 
app.set("view engine", "pug");
app.set("views",    path.join(__dirname, "views"));
app.use(express.static(__dirname+'/public/html'));
app.use(express.static(__dirname+'/public/css'));
app.use(express.static(__dirname+'/public/scripts'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//get zahtjevi
app.get('/predmeti.html',(req,res)=>{
  console.log(req.session.username);
    if(req.session.username!=null)
    res.render("predmet", {
        results: true,
        predmeti:req.session.predmeti
    }); 
    else
    res.render("predmet", {
        results: false
    }); 
    
});
app.get('/predmeti.html',(req,res)=>{
    console.log(req.session.username);
      if(req.session.username!=null)
      res.render("predmet", {
          results: true,
          predmeti:req.session.predmeti
      }); 
      else
      res.render("predmet", {
          results: false
      }); 
      
  });
  
app.get('/predmeti',(req,res)=>{
    console.log(req.session.username);
      if(req.session.username!=null)
      res.send(req.session.predmeti)
      else
      res.send(JSON.stringify({greska:"Nastavnik nije loginovan"}));     
  });
app.post('/prisustvo/predmet/:NAZIV/student/:index',(req,res)=>{
    var tzu=req.params.NAZIV;
    var tzu1=req.params.index;
    console.log(req.body['sedmica']);
      if(req.session.username!=null)
      fs.readFile(__dirname+"/data/prisustva.json", (err, data) => {
        if (err==null) 
        {
            let unpa= JSON.parse(data);
            let z=0;
            for(let i=0;i<unpa.length;i++)
            {
                if(unpa[i].predmet==tzu)
                {
                    console.log("prosao predmet")
                    var zgh=0;
                    for(let j=0;j<unpa[i].prisustva.length;j++)
                    {
                      //  console.log(unpa[i].prisustva[j].sedmica,req.body['sedmica'],unpa[i].prisustva[j].index,tzu1)
                        if(unpa[i].prisustva[j].sedmica==req.body['sedmica']&&unpa[i].prisustva[j].index==tzu1)
                        {
                            zgh=1;
                            console.log("writeam file")
                            unpa[i].prisustva[j].predavanja=req.body['predavanja'];
                            unpa[i].prisustva[j].vjezbe=req.body['vjezbe'];
                            fs.writeFile(__dirname+"/data/prisustva.json",JSON.stringify(unpa),err => {
                                if (err) {
                                        console.log("greak")
                                  console.error(err);
                                }
                                console.log("radi")
                            res.json(unpa[i]);
                              });
                            break;
                        }
                    }
                    if(zgh==0)
                    {
                        unpa[i].prisustva.push({sedmica:req.body['sedmica'],predavanja:req.body['predavanja'],vjezbe:req.body['vjezbe'],index:tzu1});
                        fs.writeFile(__dirname+"/data/prisustva.json",JSON.stringify(unpa),err => {
                            if (err) {
                                    console.log("greak")
                              console.error(err);
                            }
                            // file written successfully
                            
                            console.log("radi")
                        res.json(unpa[i]);
                          });
                    }

                    break;
                }
                
            }
        }
        });
      else
      res.json({greska:"Nastavnik nije loginovan"}); 
      
  });
  app.get('/predmet/:NAZIV',(req,res)=>{
    console.log("NAZIV");
    var tzu=req.params.NAZIV;
      if(req.session.username!=null)
      fs.readFile(__dirname+"/data/prisustva.json", (err, data) => {
        if (err==null) 
        {
            let unpa= JSON.parse(data);
            let z=0;
            for(let i=0;i<unpa.length;i++)
            {
                if(unpa[i].predmet==tzu)
                {
                    res.send(unpa[i]);
                    break;
                }
            }
        }
        });
      else
      res.json({greska:"Nastavnik nije loginovan"}); 
      
  });
///////////
//post zahtjevi
function cbCrypt(z,z1,a,res,req,k,p)
{
    if(z!=-1&&a)
    {
        z=-1;
        req.session.username=k;
        req.session.predmeti=p;
        res.json({"poruka":"Uspješna prijava"});
    }
    else if(z==z1)
    {
        res.json({"poruka":"Neuspješna prijava"});
    }
}   
app.post('/login',function(req,res){
   let tijelo = req.body;
   fs.readFile(__dirname+"/data/nastavnici.json", (err, data) => {
    if (err==null) 
    {
        let unpa= JSON.parse(data);
        let z=0;
        for(let i=0;i<unpa.length;i++)
        {
            if(unpa[i].nastavnik.username==tijelo['username'])
            bcrypt.compare(tijelo['password'],unpa[i].nastavnik.password_hash, function(err, rje) {
                 if(err==null&&rje==true)
                    {
                        cbCrypt(z,unpa.length,rje,res,req,tijelo['username'],unpa[i].predmeti);
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
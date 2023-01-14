var bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require("express-session");
const app = express();
const path=require('path')
const pug = require('pug');
//const Sequelize = require('sequelize');
//sesija
app.use(session({
    secret: 'neka tajna sifra',
    resave: true,
    saveUninitialized: true
 }));
 //baza
 const sequelize = require('./baza/baza.js');
 const Nastavnici = require('./baza/nastavnici.js')(sequelize);
const Nastavnik= require('./baza/nastavnik.js')(sequelize);
const Predmet= require('./baza/predmet.js')(sequelize);
const Prisustva=require('./baza/prisustva.js')(sequelize)
const Prisustvo=require('./baza/prisustvo.js')(sequelize)
const Student=require('./baza/student.js')(sequelize)

Nastavnici.hasMany(Nastavnik, {
  foreignKey: {
    allowNull: false
  }
});

Nastavnici.hasMany(Predmet, {
  foreignKey: {
    allowNull: false
  }
});
Prisustva.hasMany(Student,{ foreignKey: {
  allowNull: false
}});
Prisustva.hasMany(Prisustvo,{ foreignKey: {
  allowNull: false
}});
Nastavnik.sync();
Predmet.sync();
Nastavnici.sync();
Student.sync();
Prisustvo.sync();
Prisustva.sync();
//Nastavnici.create({nastavnicis:{username:"adsljga",password_hash:"dafaf"}, 
 //Predmet.findOrCreate({where:{id:1},defaults:{naziv:"gori",NastavniciId:1}}).then(function(t){console.log(t)});
 //Nastavnik.findOrCreate({where:{id:1},defaults:{username:"user",password_hash:"admin",NastavniciId:1}}).then(function(t){console.log(t)});

 var nas=require("./public/data/nastavnici.json")
 console.log(nas.length)
 function asinhronoUnos(i,nas) {
  return new Promise(function (resolve, reject) {
      Nastavnici.findOrCreate({ where: { id: i + 1 } }).then(function(results){
        Nastavnik.findOrCreate({ where: { NastavniciId: results[0].dataValues.id }, defaults: { username: nas[i].nastavnik.username, password_hash: nas[i].nastavnik.password_hash, NastavniciId: results[0].dataValues.id } })
        .then(function(results1){
                  for(var j=0;j<nas[i].predmeti.length;j++)
          Predmet.findOrCreate({ where: { NastavniciId: results[0].dataValues.id, naziv:nas[i].predmeti[j] }, defaults: { naziv: nas[i].predmeti[j], NastavniciId: results[0].dataValues.id} })
        })}
      )
  });
}
 
var nizPromisea = [];
 for(var i=0;i<nas.length;i++)
 {
    nizPromisea.push(asinhronoUnos(i,nas)) 
 }
 Promise.all(nizPromisea)
 //prisustva
 var pri=require("./public/data/prisustva.json")
 console.log(nas.length)
 function asinhronoUnos2(i,pri) {
  console.log("\ni!=",i,"\n")
  return new Promise(function (resolve, reject) {
      Prisustva.findOrCreate({ where: {predmet:pri[i].predmet, brojPredavanjaSedmicno:pri[i].brojPredavanjaSedmicno, brojVjezbiSedmicno:pri[i].brojVjezbiSedmicno }, default:{ predmet:pri[i].predmet, brojPredavanjaSedmicno:pri[i].brojPredavanjaSedmicno, brojVjezbiSedmicno:pri[i].brojVjezbiSedmicno} })
      .then(function(results){
        for(var p=0;p<pri[i].studenti.length;p++)
        {
          Student.findOrCreate({ where: { PrisustvaId: results[0].dataValues.id,ime:pri[i].studenti[p].ime,index:pri[i].studenti[p].index }, defaults: {  PrisustvaId: results[0].dataValues.id,ime:pri[i].studenti[p].ime,index:pri[i].studenti[p].index} })
        .then(function(results1){
                  for(var j=0;j<pri[i].prisustva.length;j++)
          Prisustvo.findOrCreate({ where: { PrisustvaId: results[0].dataValues.id, sedmica:pri[i].prisustva[j].sedmica,index:pri[i].prisustva[j].index}, defaults: {  PrisustvaId: results[0].dataValues.id, sedmica:pri[i].prisustva[j].sedmica,index:pri[i].prisustva[j].index,vjezbe:pri[i].prisustva[j].vjezbe,predavanja:pri[i].prisustva[j].predavanja} })
        })
        }
        }
      )
  });
}
 
var nizPromisea2 = [];
 for(var i=0;i<pri.length;i++)
 {
    nizPromisea2.push(asinhronoUnos2(i,pri)) 
 }
 Promise.all(nizPromisea2)
 

 //kraj baze
app.set("view engine", "pug");
app.set("views",    path.join(__dirname, "/public/views"));
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
     {
      Prisustva.findAll({include : [Prisustvo, Student]}).then(function(results){
        var rez=[]
        var qwe=-1
        var qwe1=0
        console.log(results[0].Prisustvos[0])
        for(var i=0;i<results.length;i++)
        {
          var k={
            predmet:"",
            brojPredavanjaSedmicno:0,
            brojVjezbiSedmicno:0
          ,prisustva:[],
        studenti:[]
      }
          k.predmet=results[i].dataValues.predmet;
          k.brojPredavanjaSedmicno=results[i].dataValues.brojPredavanjaSedmicno;
          k.brojVjezbiSedmicno=results[i].dataValues.brojVjezbiSedmicno;
          for(var j=0;j<results[i].dataValues.Students.length;j++)
          {
            var z={
              ime: "",
                index: 0
               }
               z.ime=results[i].dataValues.Students[j].ime;
               z.index=results[i].dataValues.Students[j].index;
              k.studenti.push(z)
          }
          for(var j=0;j<results[i].dataValues.Prisustvos.length;j++)
          {
            var z={
              sedmica: 0,
                predavanja: 0,
                vjezbe: 0,
                index: 0
            }
            z.sedmica=results[i].dataValues.Prisustvos[j].sedmica;
            z.index=results[i].dataValues.Prisustvos[j].index;
            z.predavanja=results[i].dataValues.Prisustvos[j].predavanja;
            z.vjezbe=results[i].dataValues.Prisustvos[j].vjezbe;
              k.prisustva.push(z)
              if(results[i].dataValues.predmet==tzu)
              {
                qwe1=i;
              }
              if(qwe==-1&&results[i].dataValues.predmet==tzu&&results[i].dataValues.Prisustvos[j].dataValues.sedmica==req.body['sedmica']&&results[i].dataValues.Prisustvos[j].dataValues.index==tzu1)
              {
                  qwe=1;
                  results[i].dataValues.Prisustvos[j].dataValues.predavanja=req.body['predavanja'];
                  results[i].dataValues.Prisustvos[j].dataValues.vjezbe=req.body['vjezbe'];
                            //update baza
                            console.log("updateeeee",results[i].dataValues.Prisustvos[j].dataValues)
                            Prisustvo.update(results[i].dataValues.Prisustvos[j].dataValues,{where:{sedmica:req.body['sedmica'],index:tzu1,PrisustvaId:results[i].dataValues.Prisustvos[j].dataValues.PrisustvaId}}).then(function(rkl){console.log("\n!!!!!!!!!!!!!!!!!!!\n",rkl,"\n******************\n")});  
                            //baza
              }
          }
          rez.push(k)
        }
        if(qwe==-1)
        {
          //treba kreirati novi zapis
          console.log("noviiiiiiiiiiiiiiiiiiiiiiiiiiiii")
          Prisustvo.create({sedmica:req.body['sedmica'],index:tzu1,PrisustvaId:results[qwe1].dataValues.id,predavanja:req.body['predavanja'],vjezbe:req.body['vjezbe']}).then(function(rkl){});
        }
        console.log("-------------------------\n")
        console.log(rez[0].prisustva[0])
            let unpa= rez
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
                            res.json(unpa[i]);
                        }
                    }
                    if(zgh==0)
                    {
                        unpa[i].prisustva.push({sedmica:req.body['sedmica'],predavanja:req.body['predavanja'],vjezbe:req.body['vjezbe'],index:tzu1});
                        res.json(unpa[i]);
                    }

                    break;
                }
                
            }
          })
        }
     else
    res.json({greska:"Nastavnik nije loginovan"}); 
      
  });
  app.get('/predmet/:NAZIV',(req,res)=>{
    console.log("NAZIV");
    var tzu=req.params.NAZIV;
      if(req.session.username!=null)
      Prisustva.findAll({include : [Prisustvo, Student]}).then(function(results){
      
        var rez=[]
        for(var i=0;i<results.length;i++)
        {
          var k={
            predmet:"",
            brojPredavanjaSedmicno:0,
            brojVjezbiSedmicno:0
          ,prisustva:[],
        studenti:[]
      }
          k.predmet=results[i].dataValues.predmet;
          k.brojPredavanjaSedmicno=results[i].dataValues.brojPredavanjaSedmicno;
          k.brojVjezbiSedmicno=results[i].dataValues.brojVjezbiSedmicno;
          for(var j=0;j<results[0].dataValues.Students.length;j++)
          {
            var z={
              ime: "",
                index: 0
               }
               z.ime=results[0].dataValues.Students[j].ime;
               z.index=results[0].dataValues.Students[j].index;
              k.studenti.push(z)
          }
          for(var j=0;j<results[0].dataValues.Prisustvos.length;j++)
          {
            var z={
              sedmica: 0,
                predavanja: 0,
                vjezbe: 0,
                index: 0
            }
            z.sedmica=results[0].dataValues.Prisustvos[j].sedmica;
            z.index=results[0].dataValues.Prisustvos[j].index;
            z.predavanja=results[0].dataValues.Prisustvos[j].predavanja;
            z.vjezbe=results[0].dataValues.Prisustvos[j].vjezbe;
              k.prisustva.push(z)
          }
          rez.push(k)
        }
        for(let i=0;i<rez.length;i++)
        {
            if(rez[i].predmet==tzu)
            {
                res.send(rez[i]);
                break;
            }
        }
      })
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
   Nastavnici.findAll({include : [Predmet, Nastavnik]}).then(function(results){
    console.log("goriidisfs")
    console.log(results[0].dataValues.Predmets[0].naziv)
    var rez=[]
    for(var i=0;i<results.length;i++)
    {
      var k={nastavnik:{
        username:"",
        password_hash:""
      },predmeti:[]}
      k.nastavnik.username=results[i].dataValues.Nastavniks[0].username;
      k.nastavnik.password_hash=results[i].dataValues.Nastavniks[0].password_hash;
      for(var j=0;j<results[0].dataValues.Predmets.length;j++)
      {
          k.predmeti.push(results[0].dataValues.Predmets[j].naziv)
      }
      rez.push(k)
    }
    console.log("-------------------------\n")
    console.log(rez)
    let z=0;
    for(let i=0;i<rez.length;i++)
    {
        if(rez[i].nastavnik.username==tijelo['username'])
        bcrypt.compare(tijelo['password'],rez[i].nastavnik.password_hash, function(err, rje) {
             if(err==null&&rje==true)
                {
                    cbCrypt(z,rez.length,rje,res,req,tijelo['username'],rez[i].predmeti);
                }
        });
        if(z==-1)
        break;
    }
  })

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
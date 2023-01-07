
function fnCallback(prvi)
{
   // document.getElementById("div").innerHTML=prvi.poruka;
        console.log(prvi);
        console.log("koliko");
        let div = document.getElementById("divj");
       var let= TabelaPrisustvo(div,prvi);
       let.prethodnaSedmica();
       let.sljedecaSedmica();
}
function fnCallback1(prvi)
{
   // document.getElementById("div").innerHTML=prvi.poruka;
        console.log("goadglga");
  }
function modk(n,a,b,c,d)
{
    console.log("u nmodkkkkkk")
    let poziviAjax=PoziviAjax;
    poziviAjax.postPrisustvo(n,b,{sedmica:a,predavanja:c,vjezbe:d},fnCallback);  
}
function klik(val)
{
    console.log("dsafjdfa="+val);
    let poziviAjax=PoziviAjax;
    poziviAjax.getPredmet(val,fnCallback);
}
function logout()
{
    
    let poziviAjax=PoziviAjax;
    poziviAjax.postLogout(fnlg);
}
function fnlg()
{
    window.location.href="/prijava.html";
}
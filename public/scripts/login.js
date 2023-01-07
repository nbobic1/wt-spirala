
function fnCallback(prvi)
{
    if(prvi.poruka=="Neuspješna prijava")
    document.getElementById("div").innerHTML=prvi.poruka;
        else
        window.location.href="/predmeti.html";
}

function login()
{
    let poziviAjax=PoziviAjax;
    poziviAjax.postLogin(document.getElementById("username").value,document.getElementById("password").value,fnCallback);
}
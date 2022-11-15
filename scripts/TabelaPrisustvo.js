let TabelaPrisustvo = function (divRef, podaci) {
    //privatni atributi modula
    //
    if(div==null||podaci==null)
    return {sljedecaSedmica:null,prethodnaSedmica:null};
    var br_prisustva=podaci.prisustvo.length;
    if(br_prisustva<0||br_prisustva!=podaci.brojPredavanjaSedmicno||br_prisustva!=podaci.brojVjezbiSedmicno)
    {
        divRef.innerHTML="Podaci o prisustvu nisu validni!";
        return {sljedecaSedmica:null,prethodnaSedmica:null};
    }
    //dva studenta sa istim indeksom
    for(var i=0;i<podaci.studenti.length;i++)
    {
        if(podaci.studenti.filter(e=>e.index==podaci.studenti[i].index).length!=0)
        {
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return {sljedecaSedmica:null,prethodnaSedmica:null};                
        }
    } 
    //index je u prisustvu ali nije u nizu sa studentima
    for(var i=0;i<podaci.prisustvo.length;i++)
    {
        if(podaci.studenti.filter(e=>e.index==podaci.prisustvo[i].index).length==0)
        {
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return {sljedecaSedmica:null,prethodnaSedmica:null};
        }
    }   
    //preskocena sedmica
    var k=podaci.prisustvo.map(e=>e.sedmica);
    if(k.length>1)
    for(var i=1;i<k.length;i++)
    {
        if(k[i]-1!=k[i-1])
        {
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return {sljedecaSedmica:null,prethodnaSedmica:null};                
        }
    }
    //isti student ima 2 ili više prisustva za istu sedmicu
    for(var i=0;i<podaci.prisustvo.length;i++)
    {
        if(podaci.prisustvo.filter(e=>e.index==podaci.prisustvo[i].index&&e.sedmica==podaci.prisustvo[i].sedmica).length!=1)
        {
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return {sljedecaSedmica:null,prethodnaSedmica:null};    
        }
    }
    //inicijalizacija modula
    divRef.innerHTML="<table><tr><td><b>Ime i prezime</b></td><td><b>Index</b></td>";
    for(var i=1;i<Math.max(...k);i++)
    {
        divRef.innerHTML+="<td><b>"+rimski(i)+"</b></td>"
    }
    divRef.innerHTML+="</tr>"
    for(var j=0;j<podaci.studenti.length;j++)
    {
        divRef.innerHTML+="<tr><td rowspan=\"2\"><b>"+podaci.studenti[j].ime+"</b></td><td rowspan=\"2\"><b>"+podaci.studenti[j].index+"</b></td>"     
        for(var i=1;i<Math.max(...k);i++)
        {

        }
        divRef.innerHTML+="</tr>"
    }
    divRef.innerHTML+="</table>"  
    console.log(div.innerHTML);
 function rimski(a)
 {
    switch(a)
    {
        case 1:
            return "I";
        break;
        case 2:
            return "II";
        break;
        case 3:
            return "III";
        break;
        case 4:
            return "IV";
        break;
        case 5:
            return "V";
        break;
        case 6:
            return "VI";
        break;
        case 7:
            return "VII";
        break;
        case 8:
            return "VIII";
        break;
        case 9:
            return "IX";
        break;
        case 10:
            return "X";
        break;
        case 11:
            return "XI";
        break;
        case 12:
            return "XII";
        break;
        case 13:
            return "XIII";
        break;
        case 14:
            return "XIV";
        break;
    }
 }
    //implementacija metoda
    let sljedecaSedmica = function () {

    }

    let prethodnaSedmica = function () {

    }


    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }
};
 

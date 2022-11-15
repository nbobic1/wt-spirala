let TabelaPrisustvo = function (divRef, podaci) {
    //privatni atributi modula
    //
    if(div==null||podaci==null)
    return {sljedecaSedmica:null,prethodnaSedmica:null};
    var br_prisustva=podaci.prisustva.length;
    if(br_prisustva<0||br_prisustva>podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno)
    {
        divRef.innerHTML="Podaci o prisustvu nisu validni!";
        return {sljedecaSedmica:null,prethodnaSedmica:null};
    }
    //dva studenta sa istim indeksom
    for(var i=0;i<podaci.studenti.length;i++)
    {
        if(podaci.studenti.filter(e=>e.index==podaci.studenti[i].index).length!=1)
        {
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return {sljedecaSedmica:null,prethodnaSedmica:null};                
        }
    } 
    //index je u prisustvu ali nije u nizu sa studentima
    for(var i=0;i<podaci.prisustva.length;i++)
    {
        if(podaci.studenti.filter(e=>e.index==podaci.prisustva[i].index).length==0)
        {
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return {sljedecaSedmica:null,prethodnaSedmica:null};
        }
    }   
    //preskocena sedmica
    var k=podaci.prisustva.map(e=>e.sedmica);
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
    for(var i=0;i<podaci.prisustva.length;i++)
    {
        if(podaci.prisustva.filter(e=>e.index==podaci.prisustva[i].index&&e.sedmica==podaci.prisustva[i].sedmica).length!=1)
        {
            divRef.innerHTML="Podaci o prisustvu nisu validni!";
            return {sljedecaSedmica:null,prethodnaSedmica:null};    
        }
    }
    //inicijalizacija modula
    function pravljenjeTabele()
    {

        var html="<table><tr><td><b>Ime i prezime</b></td><td><b>Index</b></td>";
        for(var i=1;i<Math.max(...k);i++)
        {
           html+="<td><b>"+rimski(i)+"</b></td>";
        }
        html+="<td colspan=\""+(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno)+"\"><b>"+rimski(i)+"</b></td>";
        if(Math.max(...k)==13)
        html+="<td><b>XIV  </b></td>";
        else if(Math.max(...k)!=14)
        html+="<td><b>"+rimski(Math.max(...k)+1)+"-XIV</b></td>";
        html+="</tr>"
        for(var j=0;j<podaci.studenti.length;j++)
        {
            html+="<tr><td rowspan=\"2\">"+podaci.studenti[j].ime+"</td><td rowspan=\"2\">"+podaci.studenti[j].index+"</td>";
            var pris=podaci.prisustva.filter(e=>e.index==podaci.studenti[j].index).sort((a,b)=>a.sedmica-b.sedmica);
            console.log(pris);
            //dodajem prisustvo za nedetaljne sedmice
            for(var i=0;i<pris.length-1;i++)
            {
                console.log(pris[i].predavanja+pris[i].vjezbe);
                console.log(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno);
                html+="<td rowspan=\"2\">"+Math.round(100*(pris[i].predavanja+pris[i].vjezbe)/(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno))+"%</td>";
            }
    //detaljno pirsustvo
            for(var zu=1;zu<=podaci.brojPredavanjaSedmicno;zu++)
            {
                html+="<td>p<br>"+zu;
                html+="</td>";
            }
            for(var zu=1;zu<=podaci.brojVjezbiSedmicno;zu++)
            {
                html+="<td>v<br>"+zu;
                html+="</td>";
            }
            if(Math.max(...k)!=14)
            html+="<td></td>"
            html+="</tr>"
    
            html+="<tr>";        
            for(var zu=1;zu<=podaci.brojPredavanjaSedmicno;zu++)
            {
                    if(zu<=pris[pris.length-1].predavanja)
                html+="<td class=\"prisutan\"> </td>";
                else
                html+="<td class=\"odsutan\"> </td>";
            }
            for(var zu=1;zu<=podaci.brojVjezbiSedmicno;zu++)
            {
                    if(zu<=pris[pris.length-1].vjezbe)
                html+="<td class=\"prisutan\"> </td>";
                else
                html+="<td class=\"odsutan\"> </td>";
            }
            if(Math.max(...k)!=14)
            html+="<td></td>"
            html+="</tr>"
        }
        html+="</table>"  
        html+="<button onclick=\"sljedecaSedmica()\">Click me</button><button onclick=\"prethodnaSedmica()\">Click me</button>";
        console.log(html);
        divRef.innerHTML=html;
     
    }
    pravljenjeTabele(); 
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
 

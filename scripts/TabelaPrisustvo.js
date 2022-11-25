let TabelaPrisustvo = function (divRef, podaci) {

    //privatni atributi modula
    //
    if(div==null||podaci==null)
    return {sljedecaSedmica:null,prethodnaSedmica:null};
    var br_prisustva=podaci.prisustva.length;
  
    //broj pirsustva manje od nula i proj predavanja veci od onog po sedmici
    if(podaci.prisustva.filter(e=>e.predavanja<0||e.vjezbe<0||e.predavanja>podaci.brojPredavanjaSedmicno||e.vjezbe>podaci.brojVjezbiSedmicno).length!=0)
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
    
    var k=podaci.prisustva.map(e=>e.sedmica);
    var q=Math.max(...k);
    //preskocena sedmica
  
    for(var i=Math.min(...k)+1;i<Math.max(...k)-1;i++)
    {
        if(k.filter(p=>p==i).length==0)
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
    
    let sljedecaSedmica;
    let prethodnaSedmica; 
    //inicijalizacija modula
    function pravljenjeTabele1(q)
    {
        var html="<table><tr><td><b>Ime i prezime</b></td><td><b>Index</b></td>";
        for(var i=1;i<Math.max(...k)+1;i++)
        {
            if(q==i)
           html+="<td colspan=\""+(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno)+"\"><b>"+rimski(i)+"</b></td>";
            else
            html+="<td><b>"+rimski(i)+"</b></td>"; 
        }
        if(Math.max(...k)==13)
        html+="<td><b>XIV  </b></td>";
        else if(Math.max(...k)!=14)
        html+="<td><b>"+rimski(Math.max(...k)+1)+"-XIV</b></td>";
        html+="</tr>";
        for(var j=0;j<podaci.studenti.length;j++)
        {
            html+="<tr><td rowspan=\"2\">"+podaci.studenti[j].ime+"</td><td rowspan=\"2\">"+podaci.studenti[j].index+"</td>";
            var pris=podaci.prisustva.filter(e=>e.index==podaci.studenti[j].index).sort((a,b)=>a.sedmica-b.sedmica);
            //dodajem prisustvo za nedetaljne sedmice
            for(var i=0;i<Math.max(...pris.map(x=>x.sedmica));i++)
            {
                
                if(pris.filter(x=>x.sedmica==i+1).length==0)
                {
                    if(q!=i+1)
                    html+="<td rowspan=\"2\"> </td>";  
                    else
                    {
                        html+="<td rowspan=\"2\" colspan=\""+(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno)+"\"></td>";
                    }
                }

                else if(q!=i+1)
                {
                        html+="<td rowspan=\"2\">"+Math.round(100*(pris.filter(x=>x.sedmica==i+1)[0].predavanja+pris.filter(x=>x.sedmica==i+1)[0].vjezbe)/(podaci.brojPredavanjaSedmicno+podaci.brojVjezbiSedmicno))+"%</td>";
            
                 }
                else
                {
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
                }
            }
    //detaljno pirsustvo
            
            if(Math.max(...k)!=14)
            html+="<td rowspan=\"2\"></td>";
            html+="</tr>";
    
            html+="<tr>";      
            if(pris.filter(x=>x.sedmica==q).length!=0)
            {    
                for(var zu=1;zu<=podaci.brojPredavanjaSedmicno;zu++)
                {
                        if(zu<=pris.filter(x=>x.sedmica==q)[0].predavanja)
                    html+="<td class=\"prisutan\"> </td>";
                    else
                    html+="<td class=\"odsutan\"> </td>";
                }
                for(var zu=1;zu<=podaci.brojVjezbiSedmicno;zu++)
                {
                        if(zu<=pris.filter(x=>x.sedmica==q)[0].vjezbe)
                    html+="<td class=\"prisutan\"> </td>";
                    else
                    html+="<td class=\"odsutan\"> </td>";
                }
            }  
          
            html+="</tr>";
        }
        html+="</table>";
        console.log(html);
        divRef.innerHTML=html;
        var btn=document.createElement("button");
        btn.innerHTML="<i class=\"fa-solid fa-arrow-left\"></i>";
        btn.onclick=prethodnaSedmica;
        divRef.appendChild(btn);
        var btn1=document.createElement("button");
        btn1.innerHTML="<i class=\"fa-solid fa-arrow-right\"></i>";
        btn1.onclick=sljedecaSedmica;
        divRef.appendChild(btn1);

     
    }
    likk=document.createElement("link");
         likk.rel="stylesheet";
         likk.integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==";
         likk.crossOrigin="anonymous";
         likk.referrerpolicy="no-referrer";
        likk.href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css";
        document.head.appendChild(likk);
        pravljenjeTabele1(q); 
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
     sljedecaSedmica = function () {
        if(q==Math.max(...k))
        return;
        q++;
        pravljenjeTabele1(q);
    }

    prethodnaSedmica = function () {
        if(q==1)
        return;
        q--;
        pravljenjeTabele1(q);
    }


    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }
};
 

let TabelaPrisustvo = function (divRef, podaci) {
    //privatni atributi modula
    //
    if(div==null||podaci==null)
    return {sljedecaSedmica:null,prethodnaSedmica:null};
    var br_prisustva=podaci.prisustvo.length;
    if(br_prisustva<0||br_prisustva!=podaci.brojPredavanjaSedmicno||br_prisustva!=podaci.brojVjezbiSedmicno)
    {

    }
    //dva studenta sa istim indeksom
    for(var i=0;i<podaci.studenti.length;i++)
    {
        if(podaci.studenti.filter(e=>e.index==podaci.studenti[i].index).length!=0)
        {
            
        }
    } 
    //index je u prisustvu ali nije u nizu sa studentima
    for(var i=0;i<podaci.prisustvo.length;i++)
    {
        if(podaci.studenti.filter(e=>e.index==podaci.prisustvo[i].index).length==0)
        {

        }
    }   
    //preskocena sedmica
    var k=podaci.prisustvo.map(e=>e.sedmica);
    if(k.length>1)
    for(var i=1;i<k.length;i++)
    {
        if(k[i]-1!=k[i-1])
        {
            
        }
    }
    //isti student ima 2 ili više prisustva za istu sedmicu
    for(var i=0;i<podaci.prisustvo.length;i++)
    {
        if(podaci.prisustvo.filter(e=>e.index==podaci.prisustvo[i].index&&e.sedmica==podaci.prisustvo[i].sedmica).length!=1)
        {

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
 

let div = document.getElementById("divSadrzaj");
//instanciranje
let prisustvo = TabelaPrisustvo(div, {studenti: [{ime:"Neko",index:12345},{ime:"Neko",index:12346}], prisustva:[
    {sedmica:1,predavanja:1,vjezbe:1,index:12345},
   {sedmica:2,predavanja:3,vjezbe:1,index:12345},
   {sedmica:3,predavanja:1,vjezbe:2,index:12345},
   {sedmica:1,predavanja:1,vjezbe:1,index:12346},
   {sedmica:3,predavanja:1,vjezbe:1,index:12346}], predmet:"WT", brojPredavanjaSedmicno:3, brojVjezbiSedmicno:2});

//pozivanje metoda
prisustvo.sljedecaSedmica();
prisustvo.prethodnaSedmica();

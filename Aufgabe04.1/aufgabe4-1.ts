namespace L02 {
    window.addEventListener("load", init);
    let daten: any[] = [];
    
    function init(): void {
        document.getElementById("speichern").addEventListener("click", speichern);
        document.getElementById("suchen").addEventListener("click", suchen);
    }
    
    function speichern(): void {
        let i: number = daten.length;
        let geschlecht: string;
        daten[i] = [];
        daten[i]["vorname"] = (<HTMLInputElement>document.getElementById("inputvorname")).value;
        daten[i]["nachname"] = (<HTMLInputElement>document.getElementById("inputnachname")).value;
        daten[i]["martrikelnummer"] = (<HTMLInputElement>document.getElementById("inputmartrikelnummer")).value;
        daten[i]["alter"] = (<HTMLInputElement>document.getElementById("inputalter")).value;
        if ((<HTMLInputElement>document.getElementById("male")).checked) {
            geschlecht = "männlich";
        } else {
            geschlecht = "weiblich";
        }
        daten[i]["geschlecht"] = geschlecht;
        daten[i]["studiengang"] = (<HTMLInputElement>document.getElementById("inputstudiengang")).value;
        
        (<HTMLInputElement>document.getElementById("inputvorname")).value = "";
        (<HTMLInputElement>document.getElementById("inputnachname")).value = "";
        (<HTMLInputElement>document.getElementById("inputmartrikelnummer")).value = "";
        (<HTMLInputElement>document.getElementById("inputalter")).value = "";
        (<HTMLInputElement>document.getElementById("male")).checked = false;
        (<HTMLInputElement>document.getElementById("female")).checked = false;
        (<HTMLInputElement>document.getElementById("inputstudiengang")).value = "0";
        
        (<HTMLInputElement>document.getElementById("datentabelle")).innerHTML = "";
        for (let x: number = 0; x < daten.length; x++) {
            (<HTMLInputElement>document.getElementById("datentabelle")).innerHTML += '<tr><td class="datentd">'+daten[x]["nachname"]+'</td><td  class="datentd">'+daten[x]["vorname"]+'</td><td  class="datentd">'+daten[x]["martrikelnummer"]+'</td><td  class="datentd">'+daten[x]["alter"]+'</td><td  class="datentd">'+daten[x]["geschlecht"]+'</td><td  class="datentd">'+daten[x]["studiengang"]+'</td></tr>';
        }
    }
    
    function suchen(): void {
        let query: string = (<HTMLInputElement>document.getElementById("inputsuche")).value;
        (<HTMLInputElement>document.getElementById("suchtabelle")).innerHTML = "";
        let ergebnisse: number = 0;
        for (let x: number = 0; x < daten.length; x++) {
            if (daten[x]["martrikelnummer"] == query) {
                (<HTMLInputElement>document.getElementById("suchtabelle")).innerHTML += '<tr><td class="datentd">'+daten[x]["nachname"]+'</td><td  class="datentd">'+daten[x]["vorname"]+'</td><td  class="datentd">'+daten[x]["martrikelnummer"]+'</td><td  class="datentd">'+daten[x]["alter"]+'</td><td  class="datentd">'+daten[x]["geschlecht"]+'</td><td  class="datentd">'+daten[x]["studiengang"]+'</td></tr>';
                ergebnisse++;
            }
        }
    }
}
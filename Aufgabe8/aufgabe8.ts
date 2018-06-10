namespace L03 {
    window.addEventListener("load", init);
    
    export interface Studi {
        vorname: string;
        nachname: string;
        martrikelnummer: number;
        alter: number;
        geschlecht: string;
        studiengang: string;
    }
     
    //let api: string = "http://localhost:8100";
    let api: string = "https://eia2-ss18-aufgabe5.herokuapp.com/";
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
        
        let studi: Studi;
        studi = {
            vorname: (<HTMLInputElement>document.getElementById("inputvorname")).value,
            nachname: (<HTMLInputElement>document.getElementById("inputnachname")).value,
            martrikelnummer: parseInt((<HTMLInputElement>document.getElementById("inputmartrikelnummer")).value),
            alter: parseInt((<HTMLInputElement>document.getElementById("inputalter")).value),
            geschlecht: geschlecht,
            studiengang: (<HTMLInputElement>document.getElementById("inputstudiengang")).value
        };
        console.log(JSON.stringify(studi));
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", api + "?command=insert&vorname=" + daten[i]["vorname"] + "&nachname=" + daten[i]["nachname"] + "&martrikelnummer=" + daten[i]["martrikelnummer"], true);
        xhr.addEventListener("readystatechange", refresh);
        xhr.send();
        (<HTMLInputElement>document.getElementById("inputvorname")).value = "";
        (<HTMLInputElement>document.getElementById("inputnachname")).value = "";
        (<HTMLInputElement>document.getElementById("inputmartrikelnummer")).value = "";
        (<HTMLInputElement>document.getElementById("inputalter")).value = "";
        (<HTMLInputElement>document.getElementById("male")).checked = false;
        (<HTMLInputElement>document.getElementById("female")).checked = false;
        (<HTMLInputElement>document.getElementById("inputstudiengang")).value = "0";

    }
    
    function refresh(): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", api + "?command=refresh", true);
        xhr.addEventListener("readystatechange", function (_event: ProgressEvent) {
            var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
            if (xhr.readyState == XMLHttpRequest.DONE) {
                (<HTMLInputElement>document.getElementById("datentabelle")).innerHTML = xhr.response;
            }   
        });
        xhr.send();
    }
    
    function suchen(): void {
        let query: string = (<HTMLInputElement>document.getElementById("inputsuche")).value;
        (<HTMLInputElement>document.getElementById("suchtabelle")).innerHTML = "";
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", api + "?command=search&suche=" + query, true);
        xhr.addEventListener("readystatechange", function (_event: ProgressEvent) {
            var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
            if (xhr.readyState == XMLHttpRequest.DONE) {
                (<HTMLInputElement>document.getElementById("datentabelle")).innerHTML = xhr.response;
            }   
        });
        xhr.send();
    }
}
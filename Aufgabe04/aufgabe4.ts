namespace L02 {
    window.addEventListener("load", init);
    //let icons: string[] = ["american-sign-language-interpreting", "angellist", "anchor", "balance-scale", "beer", "bomb", "camera-retro", "chess", "cloud", "dove", "envira", "fort-awesome"];
    let buchstaben: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"];
    let zahlen: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
    let symbole: string[] = ['✌', "✈", "✏", "❄", "❤", "🚬", "🚶", "🚽", "⌛", "⏰", "☀", "☔", "☕", "☺", "♠"];
    let karten: any[] = [];
    let spieler: any[] = [];
    let aktuellerspieler:number = 0;
    let kartenclasses: string[] = ["zugedeckt", "aufgedeckt", "versteckt"];
    function init(): void {
        document.getElementById("spielstart").addEventListener("click", spielstart);
        document.getElementById("inputspieler").addEventListener("change", spieleranzahl);
        document.getElementById("inputkarten").addEventListener("mousemove", kartenanzahl);
    }
    
    function spieleranzahl(): void {
        let spielerzahl: number = parseInt((<HTMLInputElement>document.getElementById("inputspieler")).value);
        console.log(spielerzahl);
        document.getElementById("spielernamen").innerHTML = "";
        for (let i: number = 0; i < spielerzahl; i++) {
            document.getElementById("spielernamen").innerHTML += '<input id="spielername'+i+'" type="text" placeholder="Name Spieler '+(i+1)+'" class="inputspielername">';
        }
    }
    
    function kartenanzahl(): void {
        let kartenanzahl: string = (<HTMLInputElement>document.getElementById("inputkarten")).value;
        document.getElementById("anzahlkartenpaare").innerHTML = kartenanzahl;
    }

    function shuffle(array: any[]) {
        let oldArray = [...array];
        let newArray: any[] = [];

        while (oldArray.length) {
            const i: number = Math.floor(Math.random() * oldArray.length);
            newArray = newArray.concat(oldArray.splice(i, 1));
        }

        return newArray;
    }
    
    function spielstart(): void {
        document.getElementById("starteinstellungen").style.display = "none";
        document.getElementById("spielframe").style.display = "block";
        console.log((<HTMLInputElement>document.getElementById("inputspieler")).value);
        console.log((<HTMLInputElement>document.getElementById("inputkarten")).value);
        let kartenpaare: number = parseInt((<HTMLInputElement>document.getElementById("inputkarten")).value);
        let spielerzahl: number = parseInt((<HTMLInputElement>document.getElementById("inputspieler")).value);
        for (let i: number = 0; i < spielerzahl; i++) {
            spieler[i] = [];
            spieler[i]["name"] = (<HTMLInputElement>document.getElementById("spielername"+i)).value;
            spieler[i]["punkte"] = 0;
            let h: HTMLElement = document.createElement("td");
            let Spielername: string = (<HTMLInputElement>document.getElementById("spielername"+i)).value
            h.innerText = ""+Spielername+": 0 Punkt(e)";
            if (i == 0) {
                h.className = "spielerhighlight";
            }
            document.getElementById("spielertabelle").appendChild(h);
        }
        console.log(spieler);
        let counter: number = 0;
        for (let i: number = 0; i < kartenpaare; i++) {
            karten[counter] = [];
            if ((<HTMLInputElement>document.getElementById("inputdeck")).value == "buchstaben") {
                karten[counter]["icon"] = buchstaben[i];
            }
            if ((<HTMLInputElement>document.getElementById("inputdeck")).value == "zahlen") {
                karten[counter]["icon"] = zahlen[i];
            }
            if ((<HTMLInputElement>document.getElementById("inputdeck")).value == "symbole") {
                karten[counter]["icon"] = symbole[i];
            }
            counter++;
            karten[counter] = [];
            if ((<HTMLInputElement>document.getElementById("inputdeck")).value == "buchstaben") {
                karten[counter]["icon"] = buchstaben[i];
            }
            if ((<HTMLInputElement>document.getElementById("inputdeck")).value == "zahlen") {
                karten[counter]["icon"] = zahlen[i];
            }
            if ((<HTMLInputElement>document.getElementById("inputdeck")).value == "symbole") {
                karten[counter]["icon"] = symbole[i];
            }
            counter++;
        }
        karten = shuffle(karten);
        console.log(karten);
        for (let i: number = 0; i < karten.length; i++) {
            let h: HTMLHeadingElement = document.createElement("h1");
            h.innerText = karten[i]["icon"];
            h.className = "zugedeckt";
            document.getElementById("spielfeld").appendChild(h);
            h.addEventListener("click", karteaufdecken);
        }
    }
    
    function karteaufdecken(): void {
        let aufgedeckt: number = document.getElementsByClassName("aufgedeckt").length;
        if (aufgedeckt == 0) {
            this.className = "aufgedeckt";
        }
        if (aufgedeckt == 1) {
            this.className = "aufgedeckt";
            let karte1: string = document.getElementsByClassName("aufgedeckt")[0].innerHTML;
            let karte2: string = document.getElementsByClassName("aufgedeckt")[1].innerHTML;
            if (karte1 == karte2) {
                spieler[aktuellerspieler]["punkte"] += 1;
                document.getElementsByClassName("spielerhighlight")[0].innerHTML = ""+spieler[aktuellerspieler]["name"]+": "+spieler[aktuellerspieler]["punkte"]+" Punkt(e)";
                window.setTimeout(paar, 2000);
            } else {
                window.setTimeout(keinpaar, 2000);
            }
        }
    }
    
    function keinpaar(): void {
        document.getElementsByClassName("aufgedeckt")[0].className = "zugedeckt";
        document.getElementsByClassName("aufgedeckt")[0].className = "zugedeckt";
        nextspieler();
    }
    
    function paar(): void {
        document.getElementsByClassName("aufgedeckt")[0].className = "versteckt";
        document.getElementsByClassName("aufgedeckt")[0].className = "versteckt";
        if (document.getElementsByClassName("zugedeckt").length == 0) {
            spielende();
        }
    }
    function nextspieler(): void {
        if (document.getElementsByTagName("td").length >= 2) {
            
    
        if (document.getElementsByClassName("spielerhighlight")[0].nextElementSibling) {
            document.getElementsByClassName("spielerhighlight")[0].nextElementSibling.className = "spielerhighlight";
            document.getElementsByClassName("spielerhighlight")[0].className = "";
            aktuellerspieler++;
        } else {
            document.getElementsByClassName("spielerhighlight")[0].parentElement.firstElementChild.className = "spielerhighlight";
            document.getElementsByClassName("spielerhighlight")[1].className = "";
            aktuellerspieler = 0;
        }
            console.log(aktuellerspieler);
            }
    }
    function spielende():void {
        document.getElementById("starteinstellungen").style.display = "block";
        document.getElementById("spielframe").style.display = "none";
        let scorelist: string = "<h1>Herzlichen Glückwunsch!</h1>";
        console.log(spieler.length);
        for (let i: number = 0; i < spieler.length; i++) {
            console.log(i);
            scorelist += '<p>'+spieler[i]["name"]+': '+spieler[i]["punkte"]+' Punkt(e)</p>';
        }
        scorelist += '<button id="neustart">Neues Spiel starten</button>';
        document.getElementById("starteinstellungen").innerHTML = scorelist;
        document.getElementById("neustart").addEventListener("click", function () { window.location.reload(); });
        
    }
} 
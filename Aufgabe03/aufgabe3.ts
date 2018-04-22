namespace L02 {
    window.addEventListener("load", init);
    //let icons: string[] = ["american-sign-language-interpreting", "angellist", "anchor", "balance-scale", "beer", "bomb", "camera-retro", "chess", "cloud", "dove", "envira", "fort-awesome"];
    let icons: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"];
    let karten: any[] = [];
    let kartenclasses: string[] = ["zugedeckt", "aufgedeckt", "versteckt"];
    function init(): void {
        document.getElementById("spielstart").addEventListener("click", spielstart);
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
        for (let i: number = 1; i <= spielerzahl; i++) {
            let h: HTMLElement = document.createElement("td");
            h.innerText = "Spieler "+i+": 0 Punkt(e)";
            if (i == 1) {
                h.className = "spielerhighlight";
            }
            document.getElementById("spielertabelle").appendChild(h);
        }
        let counter: number = 0;
        for (let i: number = 0; i < kartenpaare; i++) {
            karten[counter] = [];
            karten[counter]["icon"] = icons[i];
            counter++;
            karten[counter] = [];
            karten[counter]["icon"] = icons[i];
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
                let spielerinfos: string = document.getElementsByClassName("spielerhighlight")[0].innerHTML;
                let spielernummer: string = spielerinfos.substr(8,1);
                let punktezahl: number = parseInt(spielerinfos.substr(11,1))+1;
                document.getElementsByClassName("spielerhighlight")[0].innerHTML = "Spieler "+spielernummer+": "+punktezahl+" Punkt(e)";
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
        } else {
            document.getElementsByClassName("spielerhighlight")[0].parentElement.firstElementChild.className = "spielerhighlight";
            document.getElementsByClassName("spielerhighlight")[1].className = "";
        }
            }
    }
    function spielende():void {
        document.getElementById("starteinstellungen").style.display = "block";
        document.getElementById("spielframe").style.display = "none";
        let scorelist: string = "<h1>Herzlichen Glückwunsch!</h1>";
        for (let i: number = 0; i < document.getElementsByTagName("td").length; i++) {
            let spielerinfos: string = document.getElementsByTagName("td")[i].innerHTML;
            let spielernummer: string = spielerinfos.substr(8,1);
            let punktezahl: number = parseInt(spielerinfos.substr(11,1));
            scorelist += "<p>Spieler "+spielernummer+": "+punktezahl+" Punkte</p>";
        }
        document.getElementById("starteinstellungen").innerHTML = scorelist;
        
    }
} 
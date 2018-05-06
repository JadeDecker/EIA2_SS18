var L02;
(function (L02) {
    window.addEventListener("load", init);
    //let icons: string[] = ["american-sign-language-interpreting", "angellist", "anchor", "balance-scale", "beer", "bomb", "camera-retro", "chess", "cloud", "dove", "envira", "fort-awesome"];
    let buchstaben = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"];
    let zahlen = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
    let symbole = ['✌', "✈", "✏", "❄", "❤", "🚬", "🚶", "🚽", "⌛", "⏰", "☀", "☔", "☕", "☺", "♠"];
    let karten = [];
    let spieler = [];
    let aktuellerspieler = 0;
    let kartenclasses = ["zugedeckt", "aufgedeckt", "versteckt"];
    function init() {
        document.getElementById("spielstart").addEventListener("click", spielstart);
        document.getElementById("inputspieler").addEventListener("change", spieleranzahl);
        document.getElementById("inputkarten").addEventListener("mousemove", kartenanzahl);
    }
    function spieleranzahl() {
        let spielerzahl = parseInt(document.getElementById("inputspieler").value);
        console.log(spielerzahl);
        document.getElementById("spielernamen").innerHTML = "";
        for (let i = 0; i < spielerzahl; i++) {
            document.getElementById("spielernamen").innerHTML += '<input id="spielername' + i + '" type="text" placeholder="Name Spieler ' + (i + 1) + '" class="inputspielername">';
        }
    }
    function kartenanzahl() {
        let kartenanzahl = document.getElementById("inputkarten").value;
        document.getElementById("anzahlkartenpaare").innerHTML = kartenanzahl;
    }
    function shuffle(array) {
        let oldArray = [...array];
        let newArray = [];
        while (oldArray.length) {
            const i = Math.floor(Math.random() * oldArray.length);
            newArray = newArray.concat(oldArray.splice(i, 1));
        }
        return newArray;
    }
    function spielstart() {
        document.getElementById("starteinstellungen").style.display = "none";
        document.getElementById("spielframe").style.display = "block";
        console.log(document.getElementById("inputspieler").value);
        console.log(document.getElementById("inputkarten").value);
        let kartenpaare = parseInt(document.getElementById("inputkarten").value);
        let spielerzahl = parseInt(document.getElementById("inputspieler").value);
        for (let i = 0; i < spielerzahl; i++) {
            spieler[i] = [];
            spieler[i]["name"] = document.getElementById("spielername" + i).value;
            spieler[i]["punkte"] = 0;
            let h = document.createElement("td");
            let Spielername = document.getElementById("spielername" + i).value;
            h.innerText = "" + Spielername + ": 0 Punkt(e)";
            if (i == 0) {
                h.className = "spielerhighlight";
            }
            document.getElementById("spielertabelle").appendChild(h);
        }
        console.log(spieler);
        let counter = 0;
        for (let i = 0; i < kartenpaare; i++) {
            karten[counter] = [];
            if (document.getElementById("inputdeck").value == "buchstaben") {
                karten[counter]["icon"] = buchstaben[i];
            }
            if (document.getElementById("inputdeck").value == "zahlen") {
                karten[counter]["icon"] = zahlen[i];
            }
            if (document.getElementById("inputdeck").value == "symbole") {
                karten[counter]["icon"] = symbole[i];
            }
            counter++;
            karten[counter] = [];
            if (document.getElementById("inputdeck").value == "buchstaben") {
                karten[counter]["icon"] = buchstaben[i];
            }
            if (document.getElementById("inputdeck").value == "zahlen") {
                karten[counter]["icon"] = zahlen[i];
            }
            if (document.getElementById("inputdeck").value == "symbole") {
                karten[counter]["icon"] = symbole[i];
            }
            counter++;
        }
        karten = shuffle(karten);
        console.log(karten);
        for (let i = 0; i < karten.length; i++) {
            let h = document.createElement("h1");
            h.innerText = karten[i]["icon"];
            h.className = "zugedeckt";
            document.getElementById("spielfeld").appendChild(h);
            h.addEventListener("click", karteaufdecken);
        }
    }
    function karteaufdecken() {
        let aufgedeckt = document.getElementsByClassName("aufgedeckt").length;
        if (aufgedeckt == 0) {
            this.className = "aufgedeckt";
        }
        if (aufgedeckt == 1) {
            this.className = "aufgedeckt";
            let karte1 = document.getElementsByClassName("aufgedeckt")[0].innerHTML;
            let karte2 = document.getElementsByClassName("aufgedeckt")[1].innerHTML;
            if (karte1 == karte2) {
                spieler[aktuellerspieler]["punkte"] += 1;
                document.getElementsByClassName("spielerhighlight")[0].innerHTML = "" + spieler[aktuellerspieler]["name"] + ": " + spieler[aktuellerspieler]["punkte"] + " Punkt(e)";
                window.setTimeout(paar, 2000);
            }
            else {
                window.setTimeout(keinpaar, 2000);
            }
        }
    }
    function keinpaar() {
        document.getElementsByClassName("aufgedeckt")[0].className = "zugedeckt";
        document.getElementsByClassName("aufgedeckt")[0].className = "zugedeckt";
        nextspieler();
    }
    function paar() {
        document.getElementsByClassName("aufgedeckt")[0].className = "versteckt";
        document.getElementsByClassName("aufgedeckt")[0].className = "versteckt";
        if (document.getElementsByClassName("zugedeckt").length == 0) {
            spielende();
        }
    }
    function nextspieler() {
        if (document.getElementsByTagName("td").length >= 2) {
            if (document.getElementsByClassName("spielerhighlight")[0].nextElementSibling) {
                document.getElementsByClassName("spielerhighlight")[0].nextElementSibling.className = "spielerhighlight";
                document.getElementsByClassName("spielerhighlight")[0].className = "";
                aktuellerspieler++;
            }
            else {
                document.getElementsByClassName("spielerhighlight")[0].parentElement.firstElementChild.className = "spielerhighlight";
                document.getElementsByClassName("spielerhighlight")[1].className = "";
                aktuellerspieler = 0;
            }
            console.log(aktuellerspieler);
        }
    }
    function spielende() {
        document.getElementById("starteinstellungen").style.display = "block";
        document.getElementById("spielframe").style.display = "none";
        let scorelist = "<h1>Herzlichen Glückwunsch!</h1>";
        console.log(spieler.length);
        for (let i = 0; i < spieler.length; i++) {
            console.log(i);
            scorelist += '<p>' + spieler[i]["name"] + ': ' + spieler[i]["punkte"] + ' Punkt(e)</p>';
        }
        scorelist += '<button id="neustart">Neues Spiel starten</button>';
        document.getElementById("starteinstellungen").innerHTML = scorelist;
        document.getElementById("neustart").addEventListener("click", function () { window.location.reload(); });
    }
})(L02 || (L02 = {}));
//# sourceMappingURL=aufgabe4.js.map
var L02;
(function (L02) {
    window.addEventListener("load", init);
    //let icons: string[] = ["american-sign-language-interpreting", "angellist", "anchor", "balance-scale", "beer", "bomb", "camera-retro", "chess", "cloud", "dove", "envira", "fort-awesome"];
    let icons = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O"];
    let karten = [];
    let kartenclasses = ["zugedeckt", "aufgedeckt", "versteckt"];
    function init() {
        document.getElementById("spielstart").addEventListener("click", spielstart);
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
        for (let i = 1; i <= spielerzahl; i++) {
            let h = document.createElement("td");
            h.innerText = "Spieler " + i + ": 0 Punkte";
            if (i == 1) {
                h.className = "spielerhighlight";
            }
            document.getElementById("spielertabelle").appendChild(h);
        }
        let counter = 0;
        for (let i = 0; i < kartenpaare; i++) {
            karten[counter] = [];
            karten[counter]["icon"] = icons[i];
            counter++;
            karten[counter] = [];
            karten[counter]["icon"] = icons[i];
            counter++;
        }
        karten = shuffle(karten);
        console.log(karten);
        for (let i = 0; i < karten.length; i++) {
            let h = document.createElement("h1");
            h.innerText = karten[i]["icon"];
            h.className = kartenclasses[Math.floor(Math.random() * 3)];
            document.getElementById("spielfeld").appendChild(h);
        }
    }
})(L02 || (L02 = {}));
//# sourceMappingURL=aufgabe2.js.map
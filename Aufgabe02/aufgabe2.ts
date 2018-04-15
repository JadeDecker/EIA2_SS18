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
            h.innerText = "Spieler "+i+": 0 Punkte";
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
            h.className = kartenclasses[Math.floor(Math.random() * 3)];
            document.getElementById("spielfeld").appendChild(h);
        }
    }
} 
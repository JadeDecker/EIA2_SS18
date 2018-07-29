namespace abschlussaufgabe {
    let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    let spielbalken: spielbalken_class;
    window.addEventListener("load", setup);
    let bloecke: block[] = [];
    let superbloecke: superblock[] = [];
    let baelle: ball[] = [];
    let winner: boolean = false;
    let gameover: boolean = false;
    
    function setup(): void {
        canvas = document.getElementsByTagName("canvas")[0];
        crc2 = canvas.getContext("2d");
        spielbalken = new spielbalken_class();
        canvas.addEventListener('mousemove', movebalken_mouse);
        canvas.addEventListener('touchmove', movebalken_touch);
        let blockcount: number = 0;
        let superblockcount: number = 0;
        for (let y: number = 10; y < 200; y += 60) {        //Y-Koordinaten der Blöcke werden in einer Schleife generiert
            for (let x: number = 10; x < 800; x += 158) {   //Das Selbe passiert hier mit der X-Koordinate
                if ((Math.round(Math.random())) == 1) {     //Zufällig wird entschieden ob ein normaler Block oder ein Superblock erstellt wird
                    superbloecke[superblockcount] = new superblock(x,y,Math.floor(Math.random() * 5) + 1);
                    superblockcount++;
                } else {
                    bloecke[blockcount] = new block(x,y);
                    blockcount++;
                }
            }
        }
        baelle[0] = new ball();
        crc2.fillStyle = "#87CEEB";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        spielbalken.draw();
        for (let i: number = 0; i < bloecke.length; i++) {
            bloecke[i].draw();
        }
        for (let i: number = 0; i < superbloecke.length; i++) {
            superbloecke[i].draw();
        }
        baelle[0].draw();
        crc2.fillStyle = "#fff";
        crc2.globalAlpha = 0.5;                         //Transp wird auf 50% gesetzt
        crc2.fillRect(0,0,canvas.width, canvas.height); //Halbtransp. Hintergrund wird für Startbild gesetzt
        crc2.globalAlpha = 1.0;                         //Transp. wird zurückgesetzt
        crc2.font = "50px Arial";
        crc2.fillStyle = "#000000";
        crc2.textAlign = "center";
        crc2.fillText("Click to start!",canvas.width/2, canvas.height/2);
        canvas.addEventListener('click', start);
    }
    
    function start(): void {
        canvas.removeEventListener('click', start);     //Der für den Start verwendete EventListener wird gelöscht
        animate();                                      //Die Animation wird gestartet
    }

    function ende(): void {
        //Der letzte Spielstand wird gezeichnet
        crc2.fillStyle = "#87CEEB";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        spielbalken.draw();
        for (let i: number = 0; i < bloecke.length; i++) {
            bloecke[i].draw();
        }
        for (let i: number = 0; i < superbloecke.length; i++) {
            superbloecke[i].draw();
        }
        baelle[0].draw();
        //Spielstand wurde fertig gezeichnet

        //Halbtransp. Endbild mit entsprechnder Bezeichnung (Winner/Game over) wird über den letzten Spielstand gezeichnet
        crc2.fillStyle = "#fff";
        crc2.globalAlpha = 0.5;
        crc2.fillRect(0,0,canvas.width, canvas.height);
        crc2.globalAlpha = 1.0;
        crc2.font = "50px Arial";
        crc2.fillStyle = "#000000";
        crc2.textAlign = "center";
        if (winner) {
            crc2.fillText("Winner!",canvas.width/2, canvas.height/2);
        } else {
            crc2.fillText("Game over!",canvas.width/2, canvas.height/2);
        }
    }

    function animate(): void {
        if (bloecke.length == 0 && superbloecke.length == 0) {
            winner = true;
            ende();
            return;
        }
        crc2.fillStyle = "#87CEEB";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
        spielbalken.draw();
        for (let i: number = 0; i < bloecke.length; i++) {
            bloecke[i].draw();
            if (gettreffer(bloecke[i], baelle[0])) {    //Es wird geprüft, ob entsprechender Block getroffen ist
                var context = new Audio("sound.mp3");   //Sound wird geladen
                context.play();                         //und abgespielt
                bloecke.splice(i,1);                    //Block verschwindet
            }
        }
        for (let i: number = 0; i < superbloecke.length; i++) {
            superbloecke[i].draw();
            if (gettreffer(superbloecke[i], baelle[0])) {   //Es wird geprüft, ob entsprechender Block getroffen ist
                var context = new Audio("sound.mp3");       //Wieder Sound
                context.play();                             //abspielen
                if (superbloecke[i].treffer == 1) {         //Ist es der letzte benötigte Treffer des Superblocks?
                    superbloecke.splice(i,1);               //Block wird entfernt
                } else {
                    superbloecke[i].treffer--;              //Benötigte Treffer werden um 1 abgezogen
                }
            }
        }
        if (baelle[0].y > 550) {                                                            //Ist Ball ganz unten?
            if (baelle[0].x > (spielbalken.x-75) && baelle[0].x < (spielbalken.x+75)) {     //Ist der Spielbalken an der richtigen Position?
                baelle[0].abprallen("unten");                                               //Ball prallt wieder am Spielbalken nach oben ab.
            } else {
                gameover = true;                                                            //Spieler hat verloren
                ende();                                                                     //Endkarte mit Game Over wird angezeigt
                return;
            }
        }
        //Kollidiert der Ball mit einem der drei anderen Ränder?
        if (baelle[0].y < 0) {
            baelle[0].abprallen("oben");
        }
        if  (baelle[0].x < 0) {
            baelle[0].abprallen("links");
        }
        if  (baelle[0].x > canvas.width) {
            baelle[0].abprallen("rechts");
        }
        baelle[0].move();       //Ball wird in berechnete Richtung bewegt
        baelle[0].draw();       //und gemalt
        if (!winner && !gameover) {         //Sollte der Spieler gewonnen/verloren haben, wird die Animation gestoppt
            window.setTimeout(animate, 1);  
        }
    }
    
    function movebalken_mouse(_event): void {
        spielbalken.move((_event.clientX-(window.innerWidth-800)/2));        
    }

    function movebalken_touch(_event) {
        console.log("jetzt");
        spielbalken.move((_event.targetTouches[0].clientX-(window.innerWidth-800)/2));
        _event.preventDefault();
    }

    function gettreffer(_ball: any, _block: any) {
        if (_ball.x < _block.x && _ball.x > (_block.x-148)) {       //Koordinaten von Block und Ball werden verglichen um Kontakt zu erkennen (X-Koordinate)
            if (_ball.y < _block.y && _ball.y > (_block.y-50)) {    //Y-Koordinate wird ebenfalls geprüft
                //Trefferrichtung des Balls wird bestimmt
                let distanz_oben: number = _block.y - _ball.y;      
                let distanz_unten: number = _ball.y - (_block.y-50);
                let distanz_links: number = _block.x - _ball.x;
                let distanz_rechts: number = _ball.x - (_block.x-148);
                //Ball prallt entsprechend der Trefferrichtung ab
                if (distanz_oben < distanz_unten && distanz_oben < distanz_links && distanz_oben < distanz_rechts) {
                    baelle[0].abprallen("unten");
                }
                if (distanz_unten < distanz_oben && distanz_unten < distanz_links && distanz_unten < distanz_rechts) {
                    baelle[0].abprallen("oben");
                }
                if (distanz_links < distanz_oben && distanz_links < distanz_unten && distanz_links < distanz_rechts) {
                    baelle[0].abprallen("rechts");
                }
                if (distanz_rechts < distanz_oben && distanz_rechts < distanz_unten && distanz_rechts < distanz_links) {
                    baelle[0].abprallen("links");
                }
                return "treffer";
            }
        }
        
        return false;
    }
    
    class spielbalken_class {       //Klasse für den Spielbalken (unten)
        x: number;
        
        constructor () {
            this.x = 400;           //Wird beim Start in die Mitte gesetzt
        }
        
        move (_x: number) {
            this.x = _x;
        }
        
        draw () {
            crc2.fillStyle = "#009dff";
            crc2.fillRect(this.x-75,560,150,30);
            crc2.stroke();
        }
    }
    
    class block {                   //Klasse für normalen Block
        x: number;
        y: number;
        
        constructor (_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
        }
        
        draw () {
            crc2.fillStyle = "#009dff";
            crc2.fillRect(this.x,this.y,148,50);
        }
    }

    class superblock extends block {    //Klasse für den Superblock mit Trefferzähler
        treffer: number;
        
        constructor (_x: number, _y: number, _treffer: number) {
            super(_x, _y);
            this.treffer = _treffer;
        }
        
        draw () {
            crc2.fillStyle = "#fff500";
            crc2.fillRect(this.x,this.y,148,50);
            crc2.font = "30px Arial";
            crc2.fillStyle = "#000000";
            crc2.textAlign = "center";
            crc2.fillText(String(this.treffer), this.x+74, this.y+35); 
        }
    }

    class ball {                    //Klasse für den Ball
        x: number;
        y: number;
        direction_x: number;
        direction_y: number;
        
        constructor () {
            this.x = 400;           //Ball wird beim Start auf den Spielbalken gelegt
            this.y = 550;
            this.direction_y = -1;  //Setzt die Richtung, in die sich der Ball nach dem Start bewegt
            this.direction_x = -1;
        }
        
        move () {
            this.y += this.direction_y;
            this.x += this.direction_x;
        }
        
        draw () {
            crc2.beginPath();
            crc2.fillStyle = "#fff";
            crc2.strokeStyle = "#87CEEB";
            crc2.lineWidth = 0;
            crc2.arc(this.x,this.y,10,0*Math.PI,2*Math.PI);
            crc2.fill();
            crc2.closePath();
        }
        
        abprallen (_kante: string) {                            //Wenn der Ball irgendwo abprallt wird die Richtung der Balls umgedreht
            switch(_kante) {
                case "oben": {
                    this.direction_y = this.direction_y*(-1);
                    break;
                }
                case "unten": {
                    this.direction_y = this.direction_y*(-1);
                    break;
                }
                case "links": {
                    this.direction_x = this.direction_x*(-1);
                    break;
                }
                case "rechts": {
                    this.direction_x = this.direction_x*(-1);
                    break;
                }
            }
        }
    }
}
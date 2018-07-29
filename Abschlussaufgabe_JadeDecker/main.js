var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var abschlussaufgabe;
(function (abschlussaufgabe) {
    var canvas;
    var spielbalken;
    window.addEventListener("load", setup);
    var bloecke = [];
    var superbloecke = [];
    var baelle = [];
    var winner = false;
    var gameover = false;
    function setup() {
        canvas = document.getElementsByTagName("canvas")[0];
        abschlussaufgabe.crc2 = canvas.getContext("2d");
        spielbalken = new spielbalken_class();
        canvas.addEventListener('mousemove', movebalken_mouse);
        canvas.addEventListener('touchmove', movebalken_touch);
        var blockcount = 0;
        var superblockcount = 0;
        for (var y = 10; y < 200; y += 60) {
            for (var x = 10; x < 800; x += 158) {
                if ((Math.round(Math.random())) == 1) {
                    superbloecke[superblockcount] = new superblock(x, y, Math.floor(Math.random() * 5) + 1);
                    superblockcount++;
                }
                else {
                    bloecke[blockcount] = new block(x, y);
                    blockcount++;
                }
            }
        }
        baelle[0] = new ball();
        abschlussaufgabe.crc2.fillStyle = "#87CEEB";
        abschlussaufgabe.crc2.fillRect(0, 0, canvas.width, canvas.height);
        spielbalken.draw();
        for (var i = 0; i < bloecke.length; i++) {
            bloecke[i].draw();
        }
        for (var i = 0; i < superbloecke.length; i++) {
            superbloecke[i].draw();
        }
        baelle[0].draw();
        abschlussaufgabe.crc2.fillStyle = "#fff";
        abschlussaufgabe.crc2.globalAlpha = 0.5; //Transp wird auf 50% gesetzt
        abschlussaufgabe.crc2.fillRect(0, 0, canvas.width, canvas.height); //Halbtransp. Hintergrund wird für Startbild gesetzt
        abschlussaufgabe.crc2.globalAlpha = 1.0; //Transp. wird zurückgesetzt
        abschlussaufgabe.crc2.font = "50px Arial";
        abschlussaufgabe.crc2.fillStyle = "#000000";
        abschlussaufgabe.crc2.textAlign = "center";
        abschlussaufgabe.crc2.fillText("Click to start!", canvas.width / 2, canvas.height / 2);
        canvas.addEventListener('click', start);
    }
    function start() {
        canvas.removeEventListener('click', start); //Der für den Start verwendete EventListener wird gelöscht
        animate(); //Die Animation wird gestartet
    }
    function ende() {
        //Der letzte Spielstand wird gezeichnet
        abschlussaufgabe.crc2.fillStyle = "#87CEEB";
        abschlussaufgabe.crc2.fillRect(0, 0, canvas.width, canvas.height);
        spielbalken.draw();
        for (var i = 0; i < bloecke.length; i++) {
            bloecke[i].draw();
        }
        for (var i = 0; i < superbloecke.length; i++) {
            superbloecke[i].draw();
        }
        baelle[0].draw();
        //Spielstand wurde fertig gezeichnet
        //Halbtransp. Endbild mit entsprechnder Bezeichnung (Winner/Game over) wird über den letzten Spielstand gezeichnet
        abschlussaufgabe.crc2.fillStyle = "#fff";
        abschlussaufgabe.crc2.globalAlpha = 0.5;
        abschlussaufgabe.crc2.fillRect(0, 0, canvas.width, canvas.height);
        abschlussaufgabe.crc2.globalAlpha = 1.0;
        abschlussaufgabe.crc2.font = "50px Arial";
        abschlussaufgabe.crc2.fillStyle = "#000000";
        abschlussaufgabe.crc2.textAlign = "center";
        if (winner) {
            abschlussaufgabe.crc2.fillText("Winner!", canvas.width / 2, canvas.height / 2);
        }
        else {
            abschlussaufgabe.crc2.fillText("Game over!", canvas.width / 2, canvas.height / 2);
        }
    }
    function animate() {
        if (bloecke.length == 0 && superbloecke.length == 0) {
            winner = true;
            ende();
            return;
        }
        abschlussaufgabe.crc2.fillStyle = "#87CEEB";
        abschlussaufgabe.crc2.fillRect(0, 0, canvas.width, canvas.height);
        spielbalken.draw();
        for (var i = 0; i < bloecke.length; i++) {
            bloecke[i].draw();
            if (gettreffer(bloecke[i], baelle[0])) {
                var context = new Audio("sound.mp3"); //Sound wird geladen
                context.play(); //und abgespielt
                bloecke.splice(i, 1); //Block verschwindet
            }
        }
        for (var i = 0; i < superbloecke.length; i++) {
            superbloecke[i].draw();
            if (gettreffer(superbloecke[i], baelle[0])) {
                var context = new Audio("sound.mp3"); //Wieder Sound
                context.play(); //abspielen
                if (superbloecke[i].treffer == 1) {
                    superbloecke.splice(i, 1); //Block wird entfernt
                }
                else {
                    superbloecke[i].treffer--; //Benötigte Treffer werden um 1 abgezogen
                }
            }
        }
        if (baelle[0].y > 550) {
            if (baelle[0].x > (spielbalken.x - 75) && baelle[0].x < (spielbalken.x + 75)) {
                baelle[0].abprallen("unten"); //Ball prallt wieder am Spielbalken nach oben ab.
            }
            else {
                gameover = true; //Spieler hat verloren
                ende(); //Endkarte mit Game Over wird angezeigt
                return;
            }
        }
        //Kollidiert der Ball mit einem der drei anderen Ränder?
        if (baelle[0].y < 0) {
            baelle[0].abprallen("oben");
        }
        if (baelle[0].x < 0) {
            baelle[0].abprallen("links");
        }
        if (baelle[0].x > canvas.width) {
            baelle[0].abprallen("rechts");
        }
        baelle[0].move(); //Ball wird in berechnete Richtung bewegt
        baelle[0].draw(); //und gemalt
        if (!winner && !gameover) {
            window.setTimeout(animate, 1);
        }
    }
    function movebalken_mouse(_event) {
        spielbalken.move((_event.clientX - (window.innerWidth - 800) / 2));
    }
    function movebalken_touch(_event) {
        console.log("jetzt");
        spielbalken.move((_event.targetTouches[0].clientX - (window.innerWidth - 800) / 2));
        _event.preventDefault();
    }
    function gettreffer(_ball, _block) {
        if (_ball.x < _block.x && _ball.x > (_block.x - 148)) {
            if (_ball.y < _block.y && _ball.y > (_block.y - 50)) {
                //Trefferrichtung des Balls wird bestimmt
                var distanz_oben = _block.y - _ball.y;
                var distanz_unten = _ball.y - (_block.y - 50);
                var distanz_links = _block.x - _ball.x;
                var distanz_rechts = _ball.x - (_block.x - 148);
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
    var spielbalken_class = /** @class */ (function () {
        function spielbalken_class() {
            this.x = 400; //Wird beim Start in die Mitte gesetzt
        }
        spielbalken_class.prototype.move = function (_x) {
            this.x = _x;
        };
        spielbalken_class.prototype.draw = function () {
            abschlussaufgabe.crc2.fillStyle = "#009dff";
            abschlussaufgabe.crc2.fillRect(this.x - 75, 560, 150, 30);
            abschlussaufgabe.crc2.stroke();
        };
        return spielbalken_class;
    }());
    var block = /** @class */ (function () {
        function block(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        block.prototype.draw = function () {
            abschlussaufgabe.crc2.fillStyle = "#009dff";
            abschlussaufgabe.crc2.fillRect(this.x, this.y, 148, 50);
        };
        return block;
    }());
    var superblock = /** @class */ (function (_super) {
        __extends(superblock, _super);
        function superblock(_x, _y, _treffer) {
            var _this = _super.call(this, _x, _y) || this;
            _this.treffer = _treffer;
            return _this;
        }
        superblock.prototype.draw = function () {
            abschlussaufgabe.crc2.fillStyle = "#fff500";
            abschlussaufgabe.crc2.fillRect(this.x, this.y, 148, 50);
            abschlussaufgabe.crc2.font = "30px Arial";
            abschlussaufgabe.crc2.fillStyle = "#000000";
            abschlussaufgabe.crc2.textAlign = "center";
            abschlussaufgabe.crc2.fillText(String(this.treffer), this.x + 74, this.y + 35);
        };
        return superblock;
    }(block));
    var ball = /** @class */ (function () {
        function ball() {
            this.x = 400; //Ball wird beim Start auf den Spielbalken gelegt
            this.y = 550;
            this.direction_y = -1; //Setzt die Richtung, in die sich der Ball nach dem Start bewegt
            this.direction_x = -1;
        }
        ball.prototype.move = function () {
            this.y += this.direction_y;
            this.x += this.direction_x;
        };
        ball.prototype.draw = function () {
            abschlussaufgabe.crc2.beginPath();
            abschlussaufgabe.crc2.fillStyle = "#fff";
            abschlussaufgabe.crc2.strokeStyle = "#87CEEB";
            abschlussaufgabe.crc2.lineWidth = 0;
            abschlussaufgabe.crc2.arc(this.x, this.y, 10, 0 * Math.PI, 2 * Math.PI);
            abschlussaufgabe.crc2.fill();
            abschlussaufgabe.crc2.closePath();
        };
        ball.prototype.abprallen = function (_kante) {
            switch (_kante) {
                case "oben": {
                    this.direction_y = this.direction_y * (-1);
                    break;
                }
                case "unten": {
                    this.direction_y = this.direction_y * (-1);
                    break;
                }
                case "links": {
                    this.direction_x = this.direction_x * (-1);
                    break;
                }
                case "rechts": {
                    this.direction_x = this.direction_x * (-1);
                    break;
                }
            }
        };
        return ball;
    }());
})(abschlussaufgabe || (abschlussaufgabe = {}));

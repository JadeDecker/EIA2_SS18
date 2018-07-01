var L10_Animation;
(function (L10_Animation) {
    var canvas;
    var elemente = [];
    window.addEventListener("load", init);
    var counter;
    function init() {
        canvas = document.getElementsByTagName("canvas")[0];
        canvas.addEventListener("click", fischfutter);
        L10_Animation.crc2 = canvas.getContext("2d");
        L10_Animation.crc2 = canvas.getContext("2d");
        L10_Animation.crc2.fillStyle = "#87CEEB";
        L10_Animation.crc2.fillRect(0, 0, 1200, 800);
        L10_Animation.crc2.fillStyle = "#f4df42";
        L10_Animation.crc2.fillRect(0, 700, 1200, 800);
        //BEGINN STEIN
        L10_Animation.crc2.strokeStyle = "#0f0f0f";
        L10_Animation.crc2.fillStyle = "#a0a0a0";
        L10_Animation.crc2.lineWidth = 3;
        L10_Animation.crc2.beginPath();
        L10_Animation.crc2.moveTo(1200, 800);
        L10_Animation.crc2.lineTo(1200, 500);
        L10_Animation.crc2.lineTo(1150, 500);
        L10_Animation.crc2.lineTo(1100, 550);
        L10_Animation.crc2.lineTo(1050, 560);
        L10_Animation.crc2.lineTo(1040, 590);
        L10_Animation.crc2.lineTo(980, 600);
        L10_Animation.crc2.lineTo(950, 650);
        L10_Animation.crc2.lineTo(880, 680);
        L10_Animation.crc2.lineTo(790, 800);
        L10_Animation.crc2.lineTo(1200, 800);
        L10_Animation.crc2.stroke();
        L10_Animation.crc2.fill();
        L10_Animation.crc2.closePath();
        //ENDE STEIN
        // BEGINN ALGE 1
        var position = (Math.floor(Math.random() * (750 - 200)) + 200);
        L10_Animation.crc2.strokeStyle = "#f442a4";
        L10_Animation.crc2.lineWidth = 15;
        L10_Animation.crc2.beginPath();
        L10_Animation.crc2.moveTo(position, 730);
        L10_Animation.crc2.lineTo(position, 550);
        L10_Animation.crc2.stroke();
        L10_Animation.crc2.closePath();
        L10_Animation.crc2.beginPath();
        L10_Animation.crc2.arc(position, 600, 50, 0 * Math.PI, 1 * Math.PI);
        L10_Animation.crc2.stroke();
        L10_Animation.crc2.beginPath();
        L10_Animation.crc2.moveTo(position + 50, 600);
        L10_Animation.crc2.lineTo(position + 50, 570);
        L10_Animation.crc2.stroke();
        L10_Animation.crc2.closePath();
        L10_Animation.crc2.beginPath();
        L10_Animation.crc2.moveTo(position - 50, 600);
        L10_Animation.crc2.lineTo(position - 50, 570);
        L10_Animation.crc2.stroke();
        L10_Animation.crc2.closePath();
        // ENDE ALGE 1
        // BEGINN SEESTERN
        L10_Animation.crc2.fillStyle = "#f4426b";
        var r = 20;
        var n = 5;
        var inset = 3;
        var x = (Math.floor(Math.random() * (750 - 200)) + 200);
        var y = 720;
        L10_Animation.crc2.save();
        L10_Animation.crc2.beginPath();
        L10_Animation.crc2.translate(x, y);
        L10_Animation.crc2.moveTo(0, 0 - r);
        for (var i = 0; i < n; i++) {
            L10_Animation.crc2.rotate(Math.PI / n);
            L10_Animation.crc2.lineTo(0, 0 - (r * inset));
            L10_Animation.crc2.rotate(Math.PI / n);
            L10_Animation.crc2.lineTo(0, 0 - r);
        }
        L10_Animation.crc2.closePath();
        L10_Animation.crc2.fill();
        L10_Animation.crc2.restore();
        // ENDE SEESTERN
        //BEGINN ALGE 2
        x = (Math.floor(Math.random() * (750 - 50)) + 50);
        L10_Animation.crc2.beginPath();
        L10_Animation.crc2.moveTo(x, y);
        L10_Animation.crc2.strokeStyle = "#39bf4d";
        L10_Animation.crc2.lineWidth = 30;
        L10_Animation.crc2.bezierCurveTo(x - 30, y, x - 30, y - 100, x, y - 100);
        L10_Animation.crc2.bezierCurveTo(x + 30, y - 100, x + 30, y - 200, x, y - 200);
        L10_Animation.crc2.stroke();
        //ENDE ALGE 2
        var elno = 0;
        L10_Animation.background = L10_Animation.crc2.getImageData(0, 0, 1200, 800);
        for (counter = 0; counter < 3; counter++) {
            elemente[elno] = new L10_Animation.Fisch1();
            elno++;
        }
        for (counter = 0; counter < 10; counter++) {
            elemente[elno] = new L10_Animation.Fisch2();
            elno++;
        }
        for (counter = 0; counter < 10; counter++) {
            elemente[elno] = new L10_Animation.Luftblase();
            elno++;
        }
        animation();
    }
    function fischfutter(_event) {
        var canvastop = canvas.getBoundingClientRect().top;
        var canvasleft = canvas.getBoundingClientRect().left;
        console.log(_event.screenY + " " + _event.pageY);
        elemente[elemente.length] = new L10_Animation.futter((_event.pageX - canvasleft) * 2, (_event.pageY - canvastop) * 2);
    }
    function animation() {
        L10_Animation.crc2.clearRect(0, 0, L10_Animation.crc2.canvas.width, L10_Animation.crc2.canvas.height);
        L10_Animation.crc2.putImageData(L10_Animation.background, 0, 0);
        for (counter = 0; counter < elemente.length; counter++) {
            elemente[counter].move();
        }
        window.setTimeout(animation, 10);
    }
})(L10_Animation || (L10_Animation = {}));

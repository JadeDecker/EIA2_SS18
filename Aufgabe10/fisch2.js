var L10_Animation;
(function (L10_Animation) {
    class Fisch2 {
        constructor() {
            this.richtung1 = "l";
            this.richtung2 = "o";
            this.speed = 2;
            this.x = (Math.floor(Math.random() * (1000 - 100)) + 100);
            this.y = (Math.floor(Math.random() * (700 - 200)) + 200);
            this.speed = (Math.floor(Math.random() * (5 - 1)) + 1);
            if ((Math.floor(Math.random() * 2) + 1) == 1) {
                this.richtung1 = "l";
            }
            else {
                this.richtung1 = "r";
            }
            if ((Math.floor(Math.random() * 2) + 1) == 1) {
                this.richtung2 = "o";
            }
            else {
                this.richtung2 = "u";
            }
            this.draw();
        }
        move() {
            if (this.richtung1 == "l") {
                this.x -= this.speed;
            }
            else {
                this.x += this.speed;
            }
            if (this.richtung2 == "o") {
                this.y -= this.speed;
            }
            else {
                this.y += this.speed;
            }
            if (this.x <= 50) {
                this.richtung1 = "r";
            }
            if (this.x >= 1100) {
                this.richtung1 = "l";
            }
            if (this.y <= 50) {
                this.richtung2 = "u";
            }
            if (this.y >= 500) {
                this.richtung2 = "o";
            }
            this.draw();
        }
        draw() {
            L10_Animation.crc2.strokeStyle = "#bfbd39";
            L10_Animation.crc2.lineWidth = 3;
            L10_Animation.crc2.beginPath();
            L10_Animation.crc2.moveTo(this.x - 50, this.y);
            L10_Animation.crc2.bezierCurveTo(this.x - 20, this.y - 20, this.x + 20, this.y - 20, this.x + 50, this.y); // A2
            L10_Animation.crc2.moveTo(this.x - 50, this.y);
            L10_Animation.crc2.bezierCurveTo(this.x - 20, this.y + 20, this.x + 20, this.y + 20, this.x + 50, this.y);
            L10_Animation.crc2.moveTo(this.x + 50, this.y);
            L10_Animation.crc2.lineTo(this.x + 80, this.y + 20);
            L10_Animation.crc2.lineTo(this.x + 80, this.y - 20);
            L10_Animation.crc2.lineTo(this.x + 50, this.y);
            L10_Animation.crc2.stroke();
            L10_Animation.crc2.fillStyle = "#f4f141";
            L10_Animation.crc2.fill();
            L10_Animation.crc2.closePath();
            L10_Animation.crc2.beginPath();
            L10_Animation.crc2.moveTo(this.x - 50, this.y);
            L10_Animation.crc2.bezierCurveTo(this.x - 20, this.y + 5, this.x - 10, this.y + 5, this.x - 10, this.y);
            L10_Animation.crc2.stroke();
            L10_Animation.crc2.closePath();
            L10_Animation.crc2.beginPath();
            L10_Animation.crc2.fillStyle = "#fff";
            L10_Animation.crc2.arc(this.x - 30, this.y - 5, 5, 0 * Math.PI, 2 * Math.PI);
            L10_Animation.crc2.fill();
            L10_Animation.crc2.closePath();
            L10_Animation.crc2.beginPath();
            L10_Animation.crc2.fillStyle = "#000";
            L10_Animation.crc2.arc(this.x - 32, this.y - 3, 2, 0 * Math.PI, 2 * Math.PI);
            L10_Animation.crc2.fill();
            L10_Animation.crc2.closePath();
        }
    }
    L10_Animation.Fisch2 = Fisch2;
})(L10_Animation || (L10_Animation = {}));
//# sourceMappingURL=fisch2.js.map
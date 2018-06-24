var L10_Animation;
(function (L10_Animation) {
    class Luftblase {
        constructor() {
            this.x = (Math.floor(Math.random() * (1000 - 100)) + 100);
            this.y = (Math.floor(Math.random() * (700 - 200)) + 200);
            this.radius = (Math.floor(Math.random() * (30 - 10)) + 10);
            this.draw();
        }
        move() {
            this.y -= 2;
            if (this.y <= (0 - this.radius)) {
                this.radius = (Math.floor(Math.random() * (30 - 10)) + 10);
                this.x = (Math.floor(Math.random() * (1000 - 100)) + 100);
                this.y = 800 + this.radius;
            }
            this.draw();
        }
        draw() {
            L10_Animation.crc2.strokeStyle = "#fff";
            L10_Animation.crc2.lineWidth = 2;
            L10_Animation.crc2.beginPath();
            L10_Animation.crc2.arc(this.x, this.y, this.radius, 0 * Math.PI, 2 * Math.PI);
            L10_Animation.crc2.stroke();
        }
    }
    L10_Animation.Luftblase = Luftblase;
})(L10_Animation || (L10_Animation = {}));
//# sourceMappingURL=luftblasen.js.map
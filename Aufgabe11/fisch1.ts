namespace L10_Animation {
    export class Fisch1 extends Elemente {
        richtung1: string = "l";
        richtung2: string = "o";
        speed: number = 2;

        constructor() {
            super((Math.floor(Math.random() * (1000 - 100)) + 100), (Math.floor(Math.random() * (700 - 200)) + 200));
            this.speed = (Math.floor(Math.random() * (5 - 1)) + 1);
            if ((Math.floor(Math.random() * 2) + 1) == 1) {
                this.richtung1 = "l";
            } else {
                this.richtung1 = "r";
            }
            if ((Math.floor(Math.random() * 2) + 1) == 1) {
                this.richtung2 = "o";
            } else {
                this.richtung2 = "u";
            }
            this.draw();
        }
        
        move(): void {
            if (this.richtung1 == "l") {
                this.x -= this.speed;
            } else {
                this.x += this.speed;
            }
            if (this.richtung2 == "o") {
                this.y -= this.speed;
            } else {
                this.y += this.speed;
            }
            
            if (this.x <= 100) {
                this.richtung1 = "r";
            }
            if (this.x >= 1050) {
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

        draw(): void {
            crc2.strokeStyle = "#0582BD";
            crc2.lineWidth = 3;
            crc2.beginPath();
            crc2.moveTo(this.x-100,this.y);
            crc2.bezierCurveTo(this.x-70, this.y-70, this.x+70, this.y-70, this.x+100, this.y); // A2
            crc2.moveTo(this.x-100,this.y);
            crc2.bezierCurveTo(this.x-70, this.y+70, this.x+70, this.y+70, this.x+100, this.y);
            crc2.moveTo(this.x+100,this.y);
            crc2.lineTo(this.x+150,this.y+50);
            crc2.lineTo(this.x+150,this.y-50);
            crc2.lineTo(this.x+100,this.y);
            crc2.stroke();
            crc2.fillStyle = "#55B5DE";
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.moveTo(this.x-100,this.y);
            crc2.bezierCurveTo(this.x-100, this.y+20, this.x-80, this.y+20, this.x-60, this.y);
            crc2.stroke();
            crc2.closePath();
            crc2.beginPath();
            crc2.fillStyle = "#fff";
            crc2.arc(this.x-70,this.y-10,10,0*Math.PI,2*Math.PI);
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.fillStyle = "#000";
            crc2.arc(this.x-73,this.y-7,7,0*Math.PI,2*Math.PI);
            crc2.fill();
            crc2.closePath();
        }
    }
}
namespace L10_Animation {
    export class Luftblase extends Elemente {
        radius: number;

        constructor() {
            super((Math.floor(Math.random() * (1000 - 100)) + 100), (Math.floor(Math.random() * (700 - 200)) + 200));
            this.radius = (Math.floor(Math.random() * (30 - 10)) + 10);
            this.draw();
        }
        
        move(): void {
            this.y -= 2;
            if (this.y <= (0 - this.radius)) {
                this.radius = (Math.floor(Math.random() * (30 - 10)) + 10);
                this.x = (Math.floor(Math.random() * (1000 - 100)) + 100);
                this.y = 800+this.radius;
            }
            this.draw();
        }

        draw(): void {
            crc2.strokeStyle = "#fff";
            crc2.lineWidth = 2;
            crc2.beginPath();
            crc2.arc(this.x,this.y,this.radius,0*Math.PI,2*Math.PI);
            crc2.stroke();
        }
    }
}
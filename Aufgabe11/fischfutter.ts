namespace L10_Animation {
    export class futter extends Elemente {
        radius: number;

        constructor(_x: number, _y: number) {
            super(_x, _y);
            this.radius = (Math.floor(Math.random() * (30 - 10)) + 10);
            this.draw();
        }
        
        move(): void {
            
            if (this.y <= 750) {
                this.y += 2;
            }
            this.draw();
        }

        draw(): void {
            crc2.strokeStyle = "#db850d";
            crc2.fillStyle = "#db850d";
            crc2.lineWidth = 2;
            crc2.beginPath();
            crc2.moveTo(this.x, this.y);
            crc2.lineTo(this.x+10, this.y+10);
            crc2.lineTo(this.x+20, this.y+5);
            crc2.lineTo(this.x, this.y+8);
            crc2.closePath
            crc2.stroke();
            crc2.fill();
        }
    }
}
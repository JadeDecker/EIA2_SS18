namespace L03 {
    window.addEventListener("load", init);
    let canvas: HTMLCanvasElement;
    let crc2: CanvasRenderingContext2D;
    function init(): void {
        canvas = document.getElementsByTagName("canvas")[0];
        crc2 = canvas.getContext("2d");
        crc2.fillStyle = "#87CEEB";
        crc2.fillRect(0, 0, 1200, 800);
        crc2.fillStyle = "#f4df42";
        crc2.fillRect(0, 700, 1200, 800);
        drawalge((Math.floor(Math.random() * (1000 - 200)) + 200));
        drawseestern((Math.floor(Math.random() * (1000 - 200)) + 200), 720);
        for (let count: number = 0; count < 50; count++) {
            drawluftblase((Math.floor(Math.random() * (1150 - 50)) + 50), (Math.floor(Math.random() * (750 - 50)) + 50), (Math.floor(Math.random() * (30 - 10)) + 10));
        }
        for (let count: number = 0; count < 3; count++) {
            drwafischi1((Math.floor(Math.random() * (1000 - 100)) + 100), (Math.floor(Math.random() * (700 - 200)) + 200));
            drwafischi2((Math.floor(Math.random() * (1000 - 100)) + 100), (Math.floor(Math.random() * (700 - 200)) + 200));
            drawalgen((Math.floor(Math.random() * (1150 - 50)) + 50), 750);
        }
    }
    
    function drawalge(position: number): void {
        crc2.strokeStyle = "#f442a4";
        crc2.lineWidth = 15;
        crc2.beginPath();
        crc2.moveTo(position,730);
        crc2.lineTo(position,550);
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(position,600,50,0*Math.PI,1*Math.PI);
        crc2.stroke();
        crc2.beginPath();
        crc2.moveTo(position+50,600);
        crc2.lineTo(position+50,570);
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.moveTo(position-50,600);
        crc2.lineTo(position-50,570);
        crc2.stroke();
        crc2.closePath();
    }
    
    function drawluftblase(x: number, y: number, radius: number): void {
        crc2.strokeStyle = "#fff";
        crc2.lineWidth = 2;
        crc2.beginPath();
        crc2.arc(x,y,radius,0*Math.PI,2*Math.PI);
        crc2.stroke();
    }
    
    function drwafischi1(x: number, y: number): void {
        crc2.strokeStyle = "#0582BD";
        crc2.lineWidth = 3;
        crc2.beginPath();
        crc2.moveTo(x-100,y);
        crc2.bezierCurveTo(x-70, y-70, x+70, y-70, x+100, y); // A2
        crc2.moveTo(x-100,y);
        crc2.bezierCurveTo(x-70, y+70, x+70, y+70, x+100, y);
        crc2.moveTo(x+100,y);
        crc2.lineTo(x+150,y+50);
        crc2.lineTo(x+150,y-50);
        crc2.lineTo(x+100,y);
        crc2.stroke();
        crc2.fillStyle = "#55B5DE";
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.moveTo(x-100,y);
        crc2.bezierCurveTo(x-100, y+20, x-80, y+20, x-60, y);
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.fillStyle = "#fff";
        crc2.arc(x-70,y-10,10,0*Math.PI,2*Math.PI);
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.fillStyle = "#000";
        crc2.arc(x-73,y-7,7,0*Math.PI,2*Math.PI);
        crc2.fill();
        crc2.closePath();
    }
    
    function drwafischi2(x: number, y: number): void {
        crc2.strokeStyle = "#bfbd39";
        crc2.lineWidth = 3;
        crc2.beginPath();
        crc2.moveTo(x-50,y);
        crc2.bezierCurveTo(x-20, y-20, x+20, y-20, x+50, y); // A2
        crc2.moveTo(x-50,y);
        crc2.bezierCurveTo(x-20, y+20, x+20, y+20, x+50, y);
        crc2.moveTo(x+50,y);
        crc2.lineTo(x+80,y+20);
        crc2.lineTo(x+80,y-20);
        crc2.lineTo(x+50,y);
        crc2.stroke();
        crc2.fillStyle = "#f4f141";
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.moveTo(x-50,y);
        crc2.bezierCurveTo(x-20, y+5, x-10, y+5, x-10, y);
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.fillStyle = "#fff";
        crc2.arc(x-30,y-5,5,0*Math.PI,2*Math.PI);
        crc2.fill();
        crc2.closePath();
        crc2.beginPath();
        crc2.fillStyle = "#000";
        crc2.arc(x-32,y-3,2,0*Math.PI,2*Math.PI);
        crc2.fill();
        crc2.closePath();
    }
    
    function drawseestern(x: number, y: number): void {
        crc2.fillStyle = "#f4426b";
        let r: number = 20;
        let n: number = 5;
        let inset: number = 3;
        crc2.save();
        crc2.beginPath();
        crc2.translate(x, y);
        crc2.moveTo(0,0-r);
        for (let i: number  = 0; i < n; i++) {
            crc2.rotate(Math.PI / n);
            crc2.lineTo(0, 0 - (r*inset));
            crc2.rotate(Math.PI / n);
            crc2.lineTo(0, 0 - r);
        }
        crc2.closePath();
        crc2.fill();
        crc2.restore();
    }
    function drawalgen(x: number, y: number): void {
        crc2.beginPath();
        crc2.moveTo(x,y);
        crc2.strokeStyle = "#39bf4d";
        crc2.lineWidth = 30;
        crc2.bezierCurveTo(x-30, y, x-30, y-100, x, y-100);
        crc2.bezierCurveTo(x+30, y-100, x+30, y-200, x, y-200);
        crc2.stroke();
    }
}
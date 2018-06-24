namespace L10_Animation {
    let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    export let background: ImageData;
    let fische1: Fisch1[] = [];
    let fische2: Fisch2[] = [];
    let luftblasen: Luftblase[] = [];
    window.addEventListener("load", init);
    let counter: number;
    
    function init(): void {
        canvas = document.getElementsByTagName("canvas")[0];
        crc2 = canvas.getContext("2d");
        crc2 = canvas.getContext("2d");
        crc2.fillStyle = "#87CEEB";
        crc2.fillRect(0, 0, 1200, 800);
        crc2.fillStyle = "#f4df42";
        crc2.fillRect(0, 700, 1200, 800);
        
        //BEGINN STEIN
        crc2.strokeStyle = "#0f0f0f";
        crc2.fillStyle = "#a0a0a0";
        crc2.lineWidth = 3;
        crc2.beginPath();
        crc2.moveTo(1200,800);
        crc2.lineTo(1200,500);
        crc2.lineTo(1150,500);
        crc2.lineTo(1100,550);
        crc2.lineTo(1050,560);
        crc2.lineTo(1040,590);
        crc2.lineTo(980,600);
        crc2.lineTo(950,650);
        crc2.lineTo(880,680);
        crc2.lineTo(790,800);
        crc2.lineTo(1200,800);
        crc2.stroke();
        crc2.fill();
        crc2.closePath();
        //ENDE STEIN
        
        // BEGINN ALGE 1
        let position: number = (Math.floor(Math.random() * (750 - 200)) + 200);
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
        // ENDE ALGE 1
        
        // BEGINN SEESTERN
        crc2.fillStyle = "#f4426b";
        let r: number = 20;
        let n: number = 5;
        let inset: number = 3;
        let x: number = (Math.floor(Math.random() * (750 - 200)) + 200);
        let y: number = 720;
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
        // ENDE SEESTERN
        
        //BEGINN ALGE 2
        x = (Math.floor(Math.random() * (750 - 50)) + 50);
        crc2.beginPath();
        crc2.moveTo(x,y);
        crc2.strokeStyle = "#39bf4d";
        crc2.lineWidth = 30;
        crc2.bezierCurveTo(x-30, y, x-30, y-100, x, y-100);
        crc2.bezierCurveTo(x+30, y-100, x+30, y-200, x, y-200);
        crc2.stroke();
        //ENDE ALGE 2
        
        background = crc2.getImageData(0, 0, 1200, 800);
        for (counter = 0; counter < 3; counter++) {
            fische1[counter] = new Fisch1();
        }
        for (counter = 0; counter < 10; counter++) {
            fische2[counter] = new Fisch2();
        }
        for (counter = 0; counter < 10; counter++) {
            luftblasen[counter] = new Luftblase();
        }
        animation();
    }
    function animation(): void {
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.putImageData(background, 0, 0);
        for (counter = 0; counter < fische1.length; counter++) {
            fische1[counter].move();
        }
        for (counter = 0; counter < fische2.length; counter++) {
            fische2[counter].move();
        }
        for (counter = 0; counter < luftblasen.length; counter++) {
            luftblasen[counter].move();
        }
        window.setTimeout(animation, 10);
    }
}
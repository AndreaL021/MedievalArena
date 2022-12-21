import * as classes from "./class.js";
window.onload=()=>{
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var start = document.getElementById('start');
    // start.style.display = "none";
    var width = 1500;
    var height = 700;
    // x,y player
    var x = 400;
    var y = 300;
    // x,y player
    var enx = 900;
    var eny = 250;
    var t;
    // turni di avvelenamento
    let poison=5;
    // frame/s
    var fps = 0;
    /* variabile usata per settare l'aggiornamento dello 
    span ogni 100ms invece di 16ms */
    var fpsSpan;
    var playerDeath = false;
    var interval;
    var animation;
    // enemy
    var nemico1=new classes.Enemy;
    var nemico2=new classes.Enemy;
    var nemico3=new classes.Enemy;
    var boss=new classes.Enemy;
    // player
    var player= new classes.Player;
    
    const nemici=[nemico1, nemico2, nemico3, boss];


    function attaccoNemico(atk, personaggio) {
        if (nemico.hp>0) {
            if (personaggio.hp<atk) {
                personaggio.hp=0;
            }else{
                personaggio.hp-=atk;
            }
        }
    }
    function attacco(atk, nemico) {
        if (nemico.hp>0 && player.hp>0) {
            heal.innerHTML=``;
            let attacchi=player.atk;
            let attacco;
            let def=nemico.def;
            let message= document.querySelector(".poison");
            if (nemico.poison==true && poison>0) {
                message.innerHTML=`Avvelenamento -5`;
                nemico.hp-=5;
                poison-=1;
            }else if (nemico.poison==true && poison==0) {
                message.innerHTML=`Avvelenamento terminato`;
                nemico.poison=false;
                poison=5;
            }else if (nemico.poison==false && atk!=5) {
                message.innerHTML=``;
            }
            attacco=attacchi[atk];
            if (atk<=3) {
                def=def[atk];
            }else if (atk==4) {
                def=def[0];
                nemico.poison=true;
                message.innerHTML=`Nemico avvelenato`;
            }
            attacco-=(attacco*def/100)
            if (attacco>nemico.hp) {
                nemico.hp=0;
            }else{
                nemico.hp-=attacco;
            }
            funzioni.showDmg(attacco, nemico, poison);
        }
    }
    function restart() {
        // enemy stats
        nemico1.hp=150; nemico1.def=[30, 50, -30, 10]; nemico1.atk=30;
        nemico2.hp=200; nemico2.def= [40, 20, 30, -20]; nemico2.atk=40;
        nemico3.hp=100; nemico3.def=[10, 0, -20, -10]; nemico3.atk=70;
        boss.hp=700; boss.def=[20, -30, 40, 10]; boss.atk=50; boss.heals=1;
        // player
        player= new classes.Player;
        player.img.src = "./immagini/player.png";
        // player.img.src = "./immagini/playerBlowgun.png";
    }
    // Comandi
    document.onkeydown = function (key) {
        if (key.keyCode===32) {
            start.onmousedown();
        }
    }
    // background
    var bg = new Image();
    var wunder= new Image();
    var wundershoot= new Image();
    var flamethrower= new Image();
    var flame= new Image();
    var watergun= new Image();
    var watershoot= new Image();
    var blowgun= new Image();
    var dart= new Image();
    var punch= new Image();
    var pow= new Image();
    bg.src = "./immagini/background.jpg";
    // png player
    player.img.src = "./immagini/player.png";
    // player.img.src = "./immagini/playerBlowgun.png";
    // png arma elettrica
    wunder.src = "./immagini/wunderwaffe.png";
    wundershoot.src="./immagini/elettricita.png";
    // png arma fuoco
    flamethrower.src = "./immagini/flamethrower.png";
    flame.src="./immagini/flame.png";
    // arma acqua
    watergun.src="./immagini/watergun.png";
    watershoot.src="./immagini/watershoot.png";
    // arma veleno
    blowgun.src="./immagini/blowgun.png";
    dart.src="./immagini/dart.png";
    // attacco fisico
    punch.src="./immagini/punch.png";
    pow.src="./immagini/pow.png";
    // Enemy png
    nemico1.img.src = "./immagini/nemico1.png";
    nemico2.img.src = "./immagini/nemico2.png";
    nemico3.img.src = "./immagini/nemico3.png";
    boss.img.src = "./immagini/boss.png";
console.log([player, nemico1]);
    // pulsante START
    start.onmousedown = function () {
        restart();
        t = Date.now();
        context.clearRect(0, 0, width, height);
        // start.style.display = "none";
        playerDeath = false;
        draw();
        interval = setInterval(frames, 100);
        // riattivo i comandi che vengono disattivati alla morte
        // document.onkeydown = function (key) {
        //     if (key.keyCode===32 || key.keyCode===87) {
        //         if (speed>0) speed = 0;
        //         speed = hard.checked===false ? -330 : -400
        //     }
        // }
        // document.ontouchstart = function () {
        //     if (speed>0) speed = 0;
        //     speed = hard.checked===false ? -330 : -400
        // }
    }
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // Codice da eseguire nel caso di un dispositivo mobile
        start.style.display = "inline";
    }
    context.beginPath();
    context.font = 'bold 40px Arial';
    context.fillStyle = "red";
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // Codice da eseguire nel caso di un dispositivo mobile
        context.fillText("Press start", 650, 300);
    }else{
        // Codice da eseguire nel caso di un dispositivo tradizionale
        context.fillText("Press space to start game", 495, 300);
    }
    // DRAW
    console.log(y, eny);
            function Playbutton() {
                context.beginPath();
                context.rect(250, 350, 200, 100); 
                context.fillStyle = '#FFFFFF'; 
                context.fillStyle = 'rgba(225,225,225,0.5)';
                context.fillRect(25,72,32,32);
                context.fill(); 
                context.lineWidth = 2;
                context.strokeStyle = '#000000'; 
                context.stroke();
                context.closePath();
                context.font = '40pt Kremlin Pro Web';
                context.fillStyle = '#000000';
                context.fillText('Start', 345, 415);
              }
    function draw() {
        if (playerDeath === false) {
            var timePassed = (Date.now() - t) / 1000;
            t = Date.now();
            fps = Math.round(1 / timePassed);
            //Pulisci campo di gioco
            context.clearRect(0, 0, width, height);
            context.beginPath();
            context.drawImage(bg, 0, 0, width, height+60);
            // Playbutton();
            context.drawImage(player.img, x, y+50, 200, 250);
            // pugno
            // context.drawImage(pow, enx-100, y+50, 200, 150);
            // context.drawImage(punch, x+40, y+100, 250, 150);

            // lanciafiamme
            // context.drawImage(flame, x+250, y-50, 450, 350);
            // context.drawImage(flamethrower, x+40, y+100, 250, 150);
            // watergun
            // context.drawImage(watershoot, x+250, y-40, 450, 350);
            // context.drawImage(watergun, x-60, y+20, 450, 250);
            // cerbottana dart
            // context.drawImage(dart, x+200, y+82, 150, 100);
            // context.drawImage(blowgun, x+60, y, 300, 200);
            // wunderwaffe
            // context.drawImage(wundershoot, x+100, y-30, 600, 350);
            // context.drawImage(wunder, x, y+100, 250, 150);
            context.drawImage(nemico1.img, enx, eny, 300, 350);
            context.beginPath();
            context.fillStyle="red";
            context.fillRect(250, 450, 200, 100);
            // context.fill();
            // fps
            context.font = 'bold 25px Arial';
            context.fillStyle = 'white';
            context.fillText("FPS: " + fpsSpan, 1350, 30);
            animation = window.requestAnimationFrame(draw);
        }
    }
    var test;
    function frames() {
        fpsSpan = fps;
    }
    
    //Function to get the mouse position
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        // console.log(rect);
        console.log(event);
        // console.log(context);
        return {
            x: Math.round(event.clientX - rect.left),
            y: Math.round(event.clientY - rect.top)
        };
        // var canvasX = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
        // var canvasY = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make
    }
    //Function to check whether a point is inside a rectangle
    function isInside(pos, rect){
        return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
    }
    //The rectangle should have x,y,width,height properties
    var rect = {
        x:250,
        y:350,
        width:200,
        height:100
    };
    //Binding the click event on the canvas
    document.addEventListener('click', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        console.log(mousePos);
        if (isInside(mousePos,rect)) {
            alert('clicked inside rect');
        }else{
            alert('clicked outside rect');
        }   
    }, false);
    
    function death() {
        clearInterval(interval);
        cancelAnimationFrame(animation);
        playerDeath = true;
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // Codice da eseguire nel caso di un dispositivo mobile
            start.style.display = "inline";
        }
        start.innerHTML = "Restart";
        document.onkeydown = function (key) { 
            if (key.keyCode===32) {
                start.onmousedown();
            }
        }
        document.ontouchstart = function () { }
        context.beginPath();
        context.font = 'bold 50px Arial';
        context.fillStyle = "red"
        context.fillText("Game Over", 650, 300);
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            // Codice da eseguire nel caso di un dispositivo mobile
            context.fillText("Press restart to retry", 600, 380);
        }else{
            // Codice da eseguire nel caso di un dispositivo tradizionale
            context.fillText("Press space to restart the game", 495, 380);
        }
    }
    // start.onmousedown();
}
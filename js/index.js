//=*=\\ Główny obiekt //=*=\\
var jumpVar = false;
var endGame = false;
var game = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = cw;
        this.canvas.height = ch;
        this.canvas.border = "1px solid red";
        this.canvas.id = "canvas";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    player: function() {
        new component(plWidth, plHeight, plColor, plX, plY);
        game.writeScores();
    },
    clear: function() {
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height);
    },
    up: function() { // Ruch w górę
        plY -= plSpeed;
        new component(plWidth, plHeight, plColor, plX, plY);
        reload();
    },
    down: function() { // Ruch w dół
        plY += plSpeed;
        new component(plWidth, plHeight, plColor, plX, plY);
        reload();
    },
    right: function() { // Ruch w prawo
        plX += plSpeed;
        new component(plWidth, plHeight, plColor, plX, plY);
        reload();
    },
    left: function() { // Ruch w lewo
        plX -= plSpeed;
        new component(plWidth, plHeight, plColor, plX, plY);
        reload();
    },
    jumpVerify: function() { // Weryfikacja skoku (Czy można użyć skoku)
        if (jumpVar == true) {
            jumpVar = false;
        } else {
            jumpVar = true;
        }
    },
    jump: function() { // Skok
        if (jumpVar == false) {
            game.jumpVerify();
            for (let i = 1; i < 18; i++) {
                setTimeout(game.clear, i*25);
                setTimeout(game.up, i*25);
                setTimeout(reload, i*25);
            }
            for (let i = 1; i < 18; i++) {
                setTimeout(game.clear, i*25 + 300);
                setTimeout(game.down, i*25 + 300);
                setTimeout(reload, i*25 + 300);
            }
            setTimeout(game.jumpVerify, 18*25 + 100);
        }
    },
    floor: function() { // Rysowanie podłogi
        ctx.moveTo(0, 450);
        ctx.lineTo(1000, 450);
        ctx.stroke();
    },
    /*spike: function() { // Rysowanie kolców
        if (spikeX <= 0) {
            spikeRanX = Math.floor(Math.random() * cw - 400) + 1000;
            spikeX = spikeRanX;
        } else {
            spikeX -= 30;
        }
        ctx.moveTo(spikeX, spikeY);
        ctx.lineTo(spikeX + 20, spikeY - 30);

        ctx.moveTo(spikeX + 20, spikeY - 30);
        ctx.lineTo(spikeX + 40, spikeY);
        ctx.stroke();
    },*/
    box: function() { // Rysowanie (pojedyncze pudło)
        if (boxX <= 0) {
            boxRanX = Math.floor(Math.random() * cw - 400) + 1000;
            boxX = boxRanX;
        } else {
            boxX -= 30;
        }
        ctx.moveTo(boxX, boxY);
        ctx.lineTo(boxX, boxY - 40);

        ctx.moveTo(boxX, boxY - 40);
        ctx.lineTo(boxX + 40, boxY - 40);

        ctx.moveTo(boxX + 40, boxY - 40);
        ctx.lineTo(boxX + 40, boxY);

        ctx.moveTo(boxX + 40, boxY);
        ctx.lineTo(boxX, boxY);

        ctx.moveTo(boxX, boxY);
        ctx.lineTo(boxX + 40, boxY - 40);

        ctx.moveTo(boxX, boxY - 40);
        ctx.lineTo(boxX + 40, boxY);
        ctx.stroke();
    },
    end: function() { //Rysowanie napisów końcowych
        ctx.font = "72px Arial";
        ctx.fillStyle = fontColor;
        ctx.fillText("Koniec gry", 350, 270);
        ctx.font = "16px Arial";
        ctx.fontWeight = "normal";
        ctx.fillText("Aby zagrać ponownie użyj klawisza: P ", 700, 45);
        ctx.stroke();
    },
    crash: function() { //Sprawdzanie czy nie zaszła kolizja
        var boxWidth = boxX + 40;
        var boxHeight = boxY + 40;

        if (plX + plWidth >= boxX && plX + plWidth <= boxX + boxWidth) {
            if (plY + plHeight <= boxY && plY + plHeight + plWidth >= boxY) {
                clearInterval(mainInterval);
                clearInterval(addScoreInterval);
                console.log('Przegrałeś');
                game.end();
                endGame = true;
            }
        }

        /*if (plX + plHeight >= spikeX && plX + plHeight <= spikeX + spikeWidth) {
            if (plY + plHeight >= spikeY || plY + plHeight >= spikeY + spikeHeight) {
                clearInterval(mainInterval);
                clearInterval(addScoreInterval);
                console.log('Przegrałeś');
                game.end();
                endGame = true;
            }
        }
        if (plX + plWidth >= boxX && plX + plWidth + plHeight >= boxX) || (pl) {
            if (plY + plHeight >= boxY) ||  {
                clearInterval(mainInterval);
                clearInterval(addScoreInterval);
                console.log('Przegrałeś');
                game.end();
                endGame = true;
            }
        }*/
    },
    addScore: function() { //Dodawanie punktów
        scores += 1;
    },
    writeScores: function() {
        ctx.font = "28px Arial";
        ctx.fillStyle = fontColor;
        ctx.fillText(scores, 50, 50);
    }
}

//=*=\\ Przepis na komponenty //=*=\\
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = game.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}

//=*=\\ Funkcje wykonywane co jakiś czas //=*=\\

var mainInterval = setInterval(startGame, speedTime);
var crashInterval = setInterval(game.crash, 10);
var addScoreInterval = setInterval(game.addScore, 1400);
var speedUpInterval = setInterval(speedUp, 12400);

//=*=\\ Funkcja na start //=*=\\
function startGame() {
    game.start();
    game.floor();
    game.player();
    //game.spike();
    game.box();
}

//=*=\\ Funkcja na powrót do gry //=*=\\
function returnGame() {
    game.start();
    game.floor();
    game.player();
    //game.spike();
    //spikeX = 1000;
    game.box();
    boxX = 1000;
    speedTime = 75;
    mainInterval = setInterval(startGame, speedTime);
    addScoreInterval = setInterval(game.addScore, 1400);
    scores = 0;
    endGame = false;
}

//=*=\\ Funkcja Reload (przy skakaniu) //=*=\\
function speedUp() {
    if (speedTime > 35) {
        speedTime -= 5;
        clearInterval(mainInterval);
        mainInterval = setInterval(startGame, speedTime);
    } else {
        console.log('GAME: Osiągnąłeś najwyższy speed.')
    }
}

//=*=\\ Funkcja Reload (przy skakaniu) //=*=\\
function reload() {
    game.floor();
    game.player();
}

//=*=\\ Wywołaj funkcje startową //=*=\\
startGame();
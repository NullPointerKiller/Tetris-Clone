const gridSpace = 30;

let fallingPiece;
let gridPieces = [];
let lineFades = [];
let gridWorkers = [];

let currentScore = 0;
let currentLevel = 0;
let linesCleared = 0;

let ticks = 0;
let updateEvery = 15;
let updateEveryCurrent = 15;
let fallSpeed = gridSpace * 0.5;
let pauseGame = false;
let gameOver = false;

const gameEdgeLeft = 150;
const gameEdgeRight = 450;

const colors = [
    '#dca3ff',
    '#ff90a0',
    '#80ffb4',
    '#ff7666',
    '#70b3f5',
    '#b2e77d',
    '#ffd700'
];

function setup() {
    createCanvas(600, 540);

    fallingPiece = new PlayPiece();
    fallingPiece.resetPiece();

    textFont('Ubuntu');
}

function draw() {
    const colorDark = '#0d0d0d';
    const colorLight = '#304550';
    const colorBackground = '#e1eeb0';

    background(colorBackground);

    fill(25);
    noStroke();
    rect(gameEdgeLeft, 0, 150, height);

    //left side info panel
    rect(0, 0, gameEdgeLeft, height);

    //score rectangle
    fill(colorBackground);
    rect(450, 80, 150, 70);

    //next piece rectangle
    rect(460, 405, 130, 130, 5, 5);

    //level rectangle
    rect(460, 210, 130, 60, 5, 5);

    //lines rectangle
    rect(460, 280, 130, 60, 5, 5);

    //score lines
    fill(colorLight);
    rect(450, 85, 150, 20);
    rect(450, 110, 150, 4);
    rect(450, 140, 150, 4);

    //score banner
    fillt(colorBackground);
    rect(460, 60, 130, 35, 5, 5);

    //score banner inner rectangle
    strokeWeight(3);
    noFill();
    stroke(colorLight);
    rect(465, 65, 120, 25, 5, 5);

    //next piece inner rectangle
    stroke(colorLight);
    rect(465, 410, 120, 120, 5, 5);

    //level inner rectangle
    rect(465, 215, 120, 50, 5, 5);

    //lines inner rectangle
    rect(465, 285, 120, 50, 5, 5);

    //info labels
    fill(25);
    noStroke();
    textSize(24);
    textAlign(CENTER);
    text("Score", 525, 85);
    text("Level", 525, 238);
    text("Lines", 525, 308);

    //actual info
    textSize(24);
    textAlign(RIGHT);
    text(currentScore, 560, 135);
    text(currentLevel, 560, 260);
    text(linesCleared, 560, 330);

    //game border
    stroke(colorDark);
    line(gameEdgeRight, 0, gameEdgeRight, height);

    fallingPiece.show();

    if (keyIsDown(DOWN_ARROW)) {
        updateEvery = 2;
    }
    else {
        updateEvery = updateEveryCurrent;
    }

    if (!pauseGame) {
        ticks++;
        if (ticks >= updateEvery) {
            ticks = 0;
            fallingPiece.fall(fallSpeed);
        }
    }

    for (let i = 0; i < gridPieces.length; i++) {
        gridPieces[i].show();
    }

    for (let i = 0; i < lineFades.length; i++) {
        lineFades[i].show();
    }

    if (gridWorkers.length > 0) {
        gridWorkers[0].work();
    }

    //mostrar controles
    textAlign(CENTER);
    fill(255);
    noStroke();
    textSize(14);
    text("Controles: \n🠕\n🠔 🠗 🠖\n", 75, 155);
    text("Esquerda e Direita: \n Mover de um lado para o outro", 75, 230);
    text("Cima: \n Rotacionar Peça", 75, 280);
    text("Baixo: \n Cair rapidamente", 75, 330);
    text("R:\n Reiniciar Jogo", 75, 380);

    if (gameOver) {
        fill(colorDark);
        textSize(CENTER);
        text("Game Over!", 300, 270);
    }

    strokeWeight(3);
    stroke('#304550');
    noFill();
    rect(0, 0, width, height);
}

function keyPressed() {
    if (keyCode === 82) {
        //tecla R
        resetGame();
    }

    if (!pauseGame) {
        if (keyCode === LEFT_ARROW) {
            fallingPiece.input(LEFT_ARROW);
        } else if (keyCode === RIGHT_ARROW) {
            fallingPiece.input(RIGHT_ARROW);
        }

        if (keyCode === UP_ARROW)
            fallingPiece.input(UP_ARROW);

    }
}

class PlayPiece {
    constructor() {
        this.pos = creatVector(0, 0);
        this.rotation = 0;
        this.nextPieceType = Math.floor(Math.random() * 7);
        this.nextPieces = [];
        this.pieceType = 0;
        this.pieces = [];
        this.orientation = [];
        this.fallen = false;

    }



}
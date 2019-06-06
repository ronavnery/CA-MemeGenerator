'use strict'

let gCanvas;
let gCtx;
let gTxt;


function initEditor() {
    drawCanvas()
    printImgOnCanvas()
}

function drawCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d');
}

function printImgOnCanvas() {
    let img = new Image();
    img.src = gMeme.src;
    drawImageProp(gCtx, img, 0, 0, gCanvas.width, gCanvas.height)
}

function onTxtInput(txt) {
    draw(txt);
}

function draw(content) {
    drawCanvas();
    printImgOnCanvas();
    drawText(content, gCanvas.width / 2, 50);
}


function drawText(txt, x, y) {
    gCtx.textAlign = 'center';
    gCtx.font = '40px Impact';
    gCtx.lineWidth  = 5;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = 'white';
    gCtx.lineJoin = 'round';
    printAt(gCtx, txt, x, y, gCanvas.height-(gCanvas.height * 0.9), gCanvas.width-(gCanvas.width * 0.2))
}


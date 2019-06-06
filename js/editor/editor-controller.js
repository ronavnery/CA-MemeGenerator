'use strict'

let gCanvas;
let gCtx;
let gTxt;
let gLineHeight = 50;


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
    if (txt.length > 10) gLineHeight += 100;
    draw(txt);
}

function draw(content) {
    drawCanvas();
    printImgOnCanvas();
    drawText(content, gCanvas.width / 2, 50);
}


function drawText(txt, x, y) {
    gCtx.textAlign = 'center';
    gCtx.strokeStyle = 'white';
    gCtx.font = '40px Impact';
    printAt(gCtx, txt, x, y, 50, 400)
}


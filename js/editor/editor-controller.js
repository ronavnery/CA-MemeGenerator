'use strict'

let gCanvas;
let gCtx;
let gTxt;


function initEditor() {
    printImgOnCanvas()
}

function drawCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d');
}

function printImgOnCanvas() {
    let img = new Image();
    img.src = gMeme.src;
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0, img.width, img.height);
}

function onTxtInput(el) {
    let txt = el.value;
    let position = el.getAttribute('data-position');
    if (position === 'top') getCurrLineObj(gMeme.txts[0])
    else getCurrLineObj(gMeme.txts[1])
    // Nathalie: Add functions for alignment(left-right), alignment(up-down), color, font-family,
    pickColor()
    setTxt(txt)
    draw();
}

// Nathalie: Add function to clear line from gMeme model and draw 

function draw() {
    drawCanvas();
    printImgOnCanvas();
    var topText = gMeme.txts[0];
    var bottomText = gMeme.txts[1];
    drawText(topText.txt, topText.locX, topText.locY, topText.color);
    drawText(bottomText.txt, bottomText.locX, bottomText.locY, bottomText.color);
}


function drawText(txt, x, y, color) {
    gCtx.restore()
    gCtx.textAlign = 'center';
    gCtx.font = '40px Impact';
    gCtx.lineWidth = 5;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.lineJoin = 'round';
    gCtx.save()
    printAt(gCtx, txt, x, y, gCanvas.height - (gCanvas.height * 0.875), gCanvas.width - (gCanvas.width * 0.125))
}

function onPickColor(color) {
    if (color === undefined) color = 'white'
    pickColor(color);
}
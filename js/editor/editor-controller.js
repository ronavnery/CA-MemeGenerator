'use strict'

let gCanvas;
let gCtx;
let gTxt;
let gCurrElement;

function drawCanvas(){
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d');
}

function printImgOnCanvas(){
    let img = new Image();
    console.log(gMeme)
    img.src = gMeme.src;
    drawImageProp(gCtx, img, 0, 0, gCanvas.width, gCanvas.height)
}


function initEditor() {
    drawCanvas()
    printImgOnCanvas()
}



function draw(ev) {
    gCtx.save();
    const { offsetX, offsetY } = ev;
    switch (gCurrElement) {
        case 'text':
            drawText(gTxt, offsetX, offsetY);
            break;

    }
    gCtx.restore();
}

function pickTxt(txt) {
    gTxt = txt;
}

function drawText(txt, x, y) {
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = 'black';
    gCtx.font = '17px Arial';
    gCtx.strokeText(txt, x, y);
}

function onText(txt) {
    console.log(txt);

    pickTxt(txt);
}

function onChangeEl(elName) {
    changeEl(elName)
}

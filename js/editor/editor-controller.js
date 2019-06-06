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
    console.log(gMeme)
    img.src = gMeme.src;
    drawImageProp(gCtx, img, 0, 0, gCanvas.width, gCanvas.height)
}

function onTxtInput(txt) {
    if (txt.length > 10) gLineHeight = 100;
    draw(txt);
}

function draw(content) {
    // gCtx.restore();
    // const { offsetX, offsetY } = ev;
    console.log('entering');
    drawCanvas();
    printImgOnCanvas();
    drawText(content, gCanvas.width / 2, gLineHeight);
    // gCtx.save();
}

// function pickTxt(txt) {
//     gTxt = txt;
// }

function drawText(txt, x, y) {
    gCtx.textAlign = 'center';
    gCtx.strokeStyle = 'white';
    gCtx.font = '40px Impact';
    gCtx.strokeText(txt, x, y);
}

// function onChangeEl(elName) {
//     changeEl(elName)
// }

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
    console.log(gMeme)
    img.src = gMeme.src;
    drawImageProp(gCtx, img, 0, 0, gCanvas.width, gCanvas.height)
}

function onTxtInput(txt) {
    console.log(txt);
    draw(txt);
}

function draw(content) {
    gCtx.save();
    // const { offsetX, offsetY } = ev;
    console.log('entering');
    drawCanvas();
    printImgOnCanvas();
    drawText(content, gCanvas.width / 4, 50);

    gCtx.restore();
}

// function pickTxt(txt) {
//     gTxt = txt;
// }

function drawText(txt, x, y) {
    gCtx.strokeStyle = 'white';
    gCtx.font = '40px Impact';
    gCtx.strokeText(txt, x, y);
    gCtx.textAlign = 'Center';
}

function onChangeEl(elName) {
    changeEl(elName)
}

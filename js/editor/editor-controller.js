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
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0, img.width, img.height);
}

function onTxtInput(el) {
    let txt = el.value;
    let position = el.getAttribute('data-position');
    if (position === 'top') {
        setTopText(txt);
        // Nathalie: Add functions for alignment(left-right), alignment(up-down), color, font-family,
        draw();
    }
    else {
        setBottomText(txt);
        // Nathalie: Add functions for alignment(left-right), alignment(up-down), color, font-family,
        draw();
    }
}

// Nathalie: Add function to clear line from gMeme model and draw 

function draw() {
    drawCanvas();
    printImgOnCanvas();
    var topText = gMeme.txts[0].txt;
    var bottomText = gMeme.txts[1].txt;
    drawText(topText, gCanvas.width / 2, gCanvas.height * 0.125);
    drawText(bottomText, gCanvas.width / 2, gCanvas.height * 0.875);
}


function drawText(txt, x, y) {
    gCtx.textAlign = 'center';
    gCtx.font = '40px Impact';
    gCtx.lineWidth = 5;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = gColorTop;
    gCtx.lineJoin = 'round';
    printAt(gCtx, txt, x, y, gCanvas.height - (gCanvas.height * 0.875), gCanvas.width - (gCanvas.width * 0.125))
}

// function customColor() {
//     $('#custom').ColorPicker(onShow);

// }

function onPickColor(color, txtLoc) {
    console.log(color, txtLoc);

    pickColor(color, txtLoc);
}

function dragText(ev) {
    let posX = ev.offsetX
    let posY = ev.offsetY
    console.log(posX,posY)
}
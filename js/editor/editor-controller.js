'use strict'

let gCanvas;
let gCtx; 

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

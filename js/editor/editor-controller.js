'use strict'

let gCanvas;
let gCtx; 

function onInitEditor(){
    drawCanvas()
    printImgOnCanvas()
}

function drawCanvas(){
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d');
    
}

function printImgOnCanvas(){
    debugger
    let img = new Image();
    console.log(gMeme)
    img.src = gMeme.src;
    gCtx.drawImage(img, 0, 0, gCanvas.width , gCanvas.height)
    
}
'use strict'

let gCanvas;
let gCtx;
let gTxt;


function initEditor() {
    printImgOnCanvas()
    gCurrLine = gMeme.txts[0] // move to controller service
    // let elInput = document.querySelector('#meme-text-input');
    // elInput.focus();
    // elInput.value = '';
}

function drawCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d');
    // console.log('canvas width on draw canvas is', gCanvas.width)
}

function printImgOnCanvas() {
    let img = new Image();
    if(!gUploadedFileSrc) img.src = gMeme.src;
    else img.src = gUploadedFileSrc
    // gCanvas.width = img.width;
    // gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gUploadedFileSrc = ''
    // console.log('canvas width after pring img ', gCanvas.width)
}

function onTxtInput(el) {
    let txt = el.value;
    // Nathalie: Add functions for alignment(left-right), alignment(up-down), color, font-family,
    // pickColor();
    setTxtToCurrLine(txt)
    onChangeFontFamily()
    onPickColor(gCurrLine.color)
    setTxt(txt)
    draw();
}

function onPickColor(color) {
    if (color === undefined) color = 'white'
    pickColor(color);
}

function onChangeFontFamily() {
    let selector = document.querySelector('#change-font-family');
    let fontFamily = selector.options[selector.selectedIndex].value;
    setCurrLineFontFamily(fontFamily);
}

// Nathalie: Add function to clear line from gMeme model and draw 

function draw() {
    drawCanvas();
    printImgOnCanvas();
    gMeme.txts.forEach(txt=> {
        drawText(txt.txt, txt.locX, txt.locY, txt.color, txt.size ,txt.fontFamily)}
        );
}


// function drawText(txt, x, y, color) {
//     gCtx.restore()
//     gCtx.textAlign = 'center';
//     gCtx.font = '40px Impact';
//     gCtx.lineWidth = 5;
//     gCtx.strokeStyle = 'black';
//     gCtx.fillStyle = color;
//     gCtx.lineJoin = 'round';
//     gCtx.save()
//     printAt(gCtx, txt, x, y, gCanvas.height - (gCanvas.height * 0.875), gCanvas.width - (gCanvas.width * 0.125))
// }

function drawText(txt, x, y, color,fontSize ,fontFamily) {
    gCtx.restore()
    gCtx.textAlign = 'center';
    gCtx.font = `${fontSize + 30}px ${fontFamily}`;
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

function onAddNewLine() {
    // console.log('canvas width on Add new line is ', gCanvas.width)
    addNewLine();
    let elInput = document.querySelector('#meme-text-input');
    elInput.focus();
    elInput.value = '';
}

function onSwitchLine() {
    switchLine();
    let elInput = document.querySelector('#meme-text-input');
    elInput.value = gCurrLine.txt;
}

function onClickCanvas(ev) {
    let clickPosY = ev.offsetY
    // console.log('click pos is posY:', clickPosY)
    gMeme.txts.forEach((txt,idx) => {
        // console.log(txt.locY)
        if (clickPosY <= txt.locY && clickPosY >= (txt.locY - (txt.size + 10))) {
            // console.log('hit');
            // console.log('idx is', idx)
            switchLine(idx);
            let elInput = document.querySelector('#meme-text-input');
            elInput.value = gCurrLine.txt;
            elInput.focus();
        }
    })
}


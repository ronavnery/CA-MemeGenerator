'use strict';

let gCurrLine;
let gMemeNumOfLines;

function pickColor(color) {
    if (color === undefined) gCurrLine.color
    else if (gCurrLine === undefined) gCurrLine = gMeme.txts[0];
    gCurrLine.color = color
    // if (color === undefined) gCurrLine.color
    // else gCurrLine.color = color;

    draw();
}

// move to future editor service
function setTxtToCurrLine(txt) {
    gCurrLine.txt = txt;
}

// move to future editor service
function addNewLine() {
    let line = createLine();
    console.log('canvas width is', gCanvas.width)
    gMeme.txts.push(line);
    let newLineIdx = gMeme.txts.length - 1
    gCurrLine = gMeme.txts[newLineIdx];
    console.log(gCurrLine);
}

// move to future editor service
function createLine() {
    if (gMemeNumOfLines === 1) var locY = gCanvas.height * 0.125;
    else if (gMemeNumOfLines === 2) var locY = gCanvas.height * 0.875;
    else var locY = gCanvas.height / 2
    gMemeNumOfLines++;
    // console.log('canvas on create line is', gCanvas.width)
    return {
        locX: gCanvas.width / 2,
        locY: locY,
        txt: '',
        fontFamily: 'Impact',
        size: 20,
        align: 'left',
        color: 'white'
    }
}

// move to future editor service
function switchLine(lineIdx='none') {
    // moves to specified line idx if given as parameter, else, goes one forward
    if (lineIdx !== 'none') {
        gCurrLine = gMeme.txts[lineIdx];
        return;
    }
    let currLineIdx = gMeme.txts.indexOf(gCurrLine);
    let idxOfLastLine = gMeme.txts.length - 1;
    if (currLineIdx === idxOfLastLine) gCurrLine = gMeme.txts[0]
    else gCurrLine = gMeme.txts[currLineIdx + 1]
}

function setTxt(txt) {
    gCurrLine.txt = txt
}

function setCurrLineFontFamily(fontFamily) {
    gCurrLine.fontFamily = fontFamily

}

function changeFontSize(el) {
    if (el === 'bigger') gCurrLine.size += 2
    else gCurrLine.size -= 2
}

function alignText(el){
    const x = gCanvas.width / 2;
    if (el === 'left-aligned') {
        console.log(el);
        
        gCtx.textAlign = 'left';
        gCurrLine.align = gCtx.fillText(gMeme.txts[0].txt, x, 90);
    }

    else if (el === 'center-aligned') {
        gCtx.textAlign = 'center';
        gCtx.fillText(gMeme.txts[0].txt, x, 85);
    }
    else {
        gCtx.textAlign = 'right';
        gCtx.fillText(gMeme.txts[0].txt, x, 130);
    }
}

function downloadImg(elLink) {
    let imgContent = gCanvas.toDataURL('image/jpeg');
    elLink.href = imgContent
}
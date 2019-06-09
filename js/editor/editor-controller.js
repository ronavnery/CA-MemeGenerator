'use strict'

let gCanvas;
let gCtx;
let gTxt;
let gSavedMemes;
let gId = 1;
let gNewId = 1

function initEditor() {
    gSavedMemes = loadFromStorage('editedImg')
    if (!gSavedMemes || !gSavedMemes.length) {
        gSavedMemes = []
    }

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
    if (!gUploadedFileSrc) img.src = gMeme.src;
    else img.src = gUploadedFileSrc
    if (img.width >= 600 && img.width < 650) {
        img.width = img.width * 0.8;
        img.height = img.height * 0.8;
    } else if (img.width >= 650 && img.width < 800) {
        img.width = img.width * 0.7;
        img.height = img.height * 0.7;
    } else if (img.width >= 800 && img.width < 1000) {
        img.width = img.width * 0.6;
        img.height = img.height * 0.6;
    } else if (img.width >= 1000) {
        img.width = img.width / 3;
        img.height = img.height / 3;
    }
    gCanvas.width = img.width;
    gCanvas.height = img.height;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    gUploadedFileSrc = ''
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
    draw()
}

// Nathalie: Add function to clear line from gMeme model and draw 

function draw() {
    drawCanvas();
    printImgOnCanvas();
    gMeme.txts.forEach(txt => {
        drawText(txt.txt, txt.locX, txt.locY, txt.color, txt.size, txt.fontFamily, txt.align)
    }
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

function drawText(txt, x, y, color, fontSize, fontFamily, align) {
    gCtx.restore()
    gCtx.Align = align;
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
    focusTxtInput()

}

function onSwitchLine() {
    switchLine();
    focusTxtInput()
}

function onClickCanvas(ev) {
    let clickPosY = ev.offsetY
    // console.log('click pos is posY:', clickPosY)
    gMeme.txts.forEach((txt, idx) => {
        // console.log(txt.locY)
        if (clickPosY <= txt.locY && clickPosY >= (txt.locY - (txt.size + 10))) {
            // console.log('hit');
            // console.log('idx is', idx)
            switchLine(idx);
            focusTxtInput()
        }
    })
}

function onSaveToGalery() {

    let imgContent = gCanvas.toDataURL('image/jpeg');
    if (!gSavedMemes) {
        gSavedMemes = []
    }
    gSavedMemes.push({ id: gNewId++, src: imgContent })
    saveToStorage('editedImg', gSavedMemes)
}

function onChangeFontSize(el) {
    changeFontSize(el)
    draw()
}

function onAlignText(el) {
    alignText(el)
    draw()
}

function onDownloadImg(el) {
    downloadImg(el)
}

function onDeleteLine() {
    deleteLine()
    focusTxtInput()
    draw()
}

function focusTxtInput() {
    let elInput = document.querySelector('#meme-text-input');
    elInput.focus();
    if (gCurrLine) {
        if (gCurrLine.txt === '') elInput.value = '';
        else elInput.value = gCurrLine.txt;

    }
}
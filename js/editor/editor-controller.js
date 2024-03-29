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
}

function drawCanvas() {
    gCanvas = document.querySelector('canvas')
    gCtx = gCanvas.getContext('2d');
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
    setTxtToCurrLine(txt)
    onChangeFontFamily()
    onPickColor(gCurrLine.color)
    getCurrLineWidth()
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

function draw() {
    drawCanvas();
    printImgOnCanvas();
    gMeme.txts.forEach(txt => {
        drawText(txt.txt, txt.locX, txt.locY, txt.color, txt.size, txt.fontFamily, txt.align, txt.lineWidth)
    }
    );
}

function drawText(txt, x, y, color, fontSize, fontFamily, align) {
    gCtx.restore()
    gCtx.textAlign = 'center';
    gCtx.Align = align;
    gCtx.font = `${fontSize}px ${fontFamily}`;
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
    addNewLine();
    focusTxtInput()

}

function onSwitchLine() {
    switchLine();
    focusTxtInput()
}

function onClickCanvas(ev) {
    let clickPosY = ev.offsetY
    gMeme.txts.forEach((txt, idx) => {
        if (clickPosY <= txt.locY && clickPosY >= (txt.locY - (txt.size + 10))) {
            switchLine(idx);
            focusTxtInput()
        }
    })
}

function onSaveToGallery() {
    let imgContent = gCanvas.toDataURL('image/jpeg');
    if (!gSavedMemes) {
        gSavedMemes = []
    }
    gSavedMemes.push({ id: gNewId++, src: imgContent })
    saveToStorage('editedImg', gSavedMemes)

    let elSaveBtn = document.querySelector('#save-image-to-gallery');
    elSaveBtn.classList.add('saved-to-gallery')
    elSaveBtn.disabled = true;
    elSaveBtn.innerHTML = 'Saved to gallery'

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

function onDeleteMyMeme(el) {
    let imgId = el.dataset.id;
    deleteMyMeme(imgId);
    saveToStorage('editedImg', gSavedMemes)
    hideEditorModal();
    renderReflectiveGallery();
}
'use strict'

let gSavedMemes;

function onInit() {
    gSavedMemes = loadFromStorage('editedImg')
}

function onDeleteImg(el) {
    let imgId = el.dataset.id
        deleteImg(imgId);
}

function onDownloadImg(elLink) {
    downloadImg(elLink)
}
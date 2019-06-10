'use strict'

function deleteImg(imgId){
    let ImgIdx = gSavedMemes.findIndex(function (img) { 
        return img.id === +imgId
     });
    gSavedMemes.splice(ImgIdx, 1);
    saveImages();
    onInit()
}


function saveImages() {
    saveToStorage('editedImg', gSavedMemes)
}


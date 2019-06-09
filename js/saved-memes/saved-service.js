'use strict'
console.log('service ready');


function deleteImg(imgId){
    var ImgIdx = gSavedMemes.findIndex(function (img) { 
        return img.id === +imgId
     });
    gSavedMemes.splice(ImgIdx, 1);
    saveImages();
    // renderGallery()
    onInit()
}


function saveImages() {
    saveToStorage('editedImg', gSavedMemes)
}


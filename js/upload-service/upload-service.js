'use strict'

let gUploadedFileSrc;


function onFileInputChange(ev) {
    drawCanvas()
    handleImageFromInput(ev, showEditorModal)
}

function handleImageFromInput(ev, onImageReady) {
    let reader = new FileReader();
    reader.onload = function (event) {
        let img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
        gUploadedFileSrc = img.src
        gMeme = createMeme(gNextId++, gUploadedFileSrc);
        
        gImgs.unshift(createImg(img.src, []))

    }
    reader.readAsDataURL(ev.target.files[0]);
}


function getKeyWordsFromUser(){

}
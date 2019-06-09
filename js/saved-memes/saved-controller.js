'use strict'
console.log('controller ready');

let gSavedMemes;

function onInit() {
    gSavedMemes = loadFromStorage('editedImg')
    if (!gSavedMemes || !gSavedMemes.length) {
        document.querySelector('.collection').innerHTML = '<h1>Nothing ready yet... Go Edit some memes!</h1>'
    } else renderGallery()
}

function renderGallery() {
    saveImages()
    let elGallery = document.querySelector('.collection');
    let htmlStr = '';
    // let images = getImagesForDisplay();

    gSavedMemes.forEach(img => {
        htmlStr += genGalleryItemHtml(img.id, img.src);
    })
    elGallery.innerHTML = htmlStr;
}

function genGalleryItemHtml(id, src) {
    return `
    <section class="gallery-item">
    <img class="gallery-img id${id}" data-id="${id}" src="${src}">
    <div class="what-next-modal">
    <div class="middle">

    <button class="svg-size" data-id="${id}" src="${src}" onclick="onShareImg(this)">Share</button>
    <button class="svg-size" data-id="${id}" src="${src}" onclick="onDeleteImg(this)">Delete</button>
  
    </div>
    </div>
    </section>`
}



function onDeleteImg(el) {
    console.log(el)
    var imgId = el.dataset.id
    deleteImg(imgId);
    // renderGallery()
}


function onDownloadImg(elLink) {
    console.log(elLink);
    
    downloadImg(elLink)
}
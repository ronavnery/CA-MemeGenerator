'use strict';

function onInit() {
    gImgs = createImgs();
    renderGallery();
}

function onImageClick(el) {
    let id = el.getAttribute('data-id');
    let src = el.getAttribute('src');
    console.log(id,src)
    gMeme = createMeme(id, src);
    window.open('editor.html');
}


function renderGallery() {
    let elGallery = document.querySelector('.gallery');
    let htmlStr = '';
    gImgs.forEach(img => {
        htmlStr += genGalleryItemHtml(img.id, img.src);
    })
    elGallery.innerHTML = htmlStr;
}

function genGalleryItemHtml(id, src) {
    return `<section class="gallery-item">
    <img onclick="onImageClick(this)" data-id="${id}" src="${src}">
    </section>`
}
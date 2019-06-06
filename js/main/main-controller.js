'use strict';

function onInit() {
    gImgs = createImgs();
    renderGallery();
    hideEditorModal();
}

function onImageClick(el) {
    let id = el.getAttribute('data-id');
    let src = el.getAttribute('src');
    gMeme = createMeme(id, src);
    // window.open('editor.html');
    showEditorModal();
}

function hideEditorModal() {
    let elEditModal = document.querySelector('.editor-modal');
    elEditModal.classList.add('hide');
}

function showEditorModal() {
    let elEditModal = document.querySelector('.editor-modal');
    elEditModal.classList.remove('hide');

    drawCanvas();
    printImgOnCanvas();
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
'use strict';

let gIsSearchOn;

function onInit() {
    gImgs = loadFromStorage('images')
    if (!gImgs || !gImgs.length) {
        gImgs = createImgs();
    }

    saveImages()
    renderGallery();
    hideEditorModal();
    addEventListeners();
    renderDataList();
}

function addEventListeners() {
    let elSearchInput = document.querySelector('#search-input');
    elSearchInput.addEventListener('input', function () {
        let searchTerm = (this.value).toLowerCase();
        if (searchTerm.length) gIsSearchOn = true;
        else gIsSearchOn = false;
        searchImg(searchTerm)
        renderGallery();
    });
}

function onImgClick(el) {
    let id = el.getAttribute('data-id');
    let src = el.getAttribute('src');
    drawCanvas();
    gMeme = createMeme(id, src);
    showEditorModal();
}

function hideEditorModal() {
    let elEditModal = document.querySelector('.editor-modal');
    elEditModal.classList.add('hide');

    let elInput = document.querySelector('#meme-text-input')
    elInput.value = ''

    renderGallery()
}

function showEditorModal() {
    let elEditModal = document.querySelector('.editor-modal');
    elEditModal.classList.remove('hide');
    initEditor();
}

function renderGallery() {
    saveImages()
    let elGallery = document.querySelector('.gallery');
    let htmlStr = '';
    let images = getImagesForDisplay();

    images.forEach(img => {
        htmlStr += genGalleryItemHtml(img.id, img.src);
    })
    elGallery.innerHTML = htmlStr;
}

function genGalleryItemHtml(id, src) {
    return `
    <section class="gallery-item">
    <img class="gallery-img" onclick=onImgClick(this) data-id="${id}" src="${src}">
    </section>`
}

function renderDataList() {
    let elDataList = document.querySelector('datalist');
    let strHtml = '';
    let keywords = getKeywordsDataList();
    keywords.forEach(keyword => {
        strHtml += `<option value="${keyword}">`
    })
    elDataList.innerHTML = strHtml;

}

function saveImages() {
    saveToStorage('images', gImgs)
}


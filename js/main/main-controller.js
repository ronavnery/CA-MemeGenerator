'use strict';

let gIsSearchOn;

function onInit() {
    init();
    renderGallery();
    hideEditorModal();
    addEventListeners();
    renderDataList();
    renderPopularList();
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

    // Add img keywords to popular keywords list
    addKeywordsAsPopular(id);
}

function hideEditorModal() {
    let elEditModal = document.querySelector('.editor-modal');
    elEditModal.classList.add('hide');

    let elInput = document.querySelector('#meme-text-input')
    elInput.value = ''

    renderGallery()
    renderPopularList(); // Remove after we tranform editor modal into a page
}

function showEditorModal() {
    let elEditModal = document.querySelector('.editor-modal');
    elEditModal.classList.remove('hide');
    initEditor();
}

function renderGallery() {
    save();
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

function renderPopularList() {
    let elPopularList = document.querySelector('.popular-list');
    let allWordsAsEls = []
    let mostPopularSearches = getMostPopularSearches();
    for (let i = 0; i < mostPopularSearches.length; i++) {
        allWordsAsEls.push(`<span class="popular-${i}">${mostPopularSearches[i]}</span>`)
    }

    // Rendering the list in a random order
    let strHtml = '';
    let randomUniqueNumList = genRandomUniqueNumList(allWordsAsEls.length);
    randomUniqueNumList.forEach(num => {
        strHtml += allWordsAsEls[num];
    })
    elPopularList.innerHTML = strHtml
}


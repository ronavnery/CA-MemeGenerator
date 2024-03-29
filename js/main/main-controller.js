'use strict';

let gIsSearchOn;
let gIsPopularKeywordPressed;
let gIsShowingMyMemes;

function onInit() {
    init();
    renderReflectiveGallery();
    hideEditorModal();
    addEventListeners();
    renderDataList();
    renderPopularList();
}

function addEventListeners() {
    let elSearchInput = document.querySelector('#search-input');
    let elWall = document.querySelector('#wall');
    elSearchInput.addEventListener('input', function () {
        elWall.style.transform = 'rotateY(45deg) translateX(0px)' // Scrolling to beginning of gallery on search
        let isBelow700 = window.matchMedia("(max-width: 700px)").matches
        if (isBelow700) {
            elWall.style.transform = ''
        }
        let searchTerm = (this.value).toLowerCase();
        if (searchTerm.length) gIsSearchOn = true;
        else gIsSearchOn = false;
        searchImg(searchTerm)
        renderReflectiveGallery();
    });
}

function onImgClick(el) {
    let id = el.getAttribute('data-id');
    let src = el.getAttribute('src');
    drawCanvas();
    gMeme = createMeme(id, src);
    showEditorModal();
    focusTxtInput()
    gCurrLine.locY = gCanvas.height * 0.125;
    gCurrLine.locX = gCanvas.width / 2;
    addKeywordsAsPopular(id); // Add img keywords to popular keywords list
    let elDeleteMyMemeBtn = document.querySelector('.delete-my-meme');
    if (gIsShowingMyMemes) elDeleteMyMemeBtn.classList.remove('hide');
}

function hideEditorModal() {
    document.querySelector('.main-gallery').classList.remove('hide');
    let elEditModal = document.querySelector('.editor-modal');
    elEditModal.classList.add('hide');
    let elFooter = document.querySelector('footer');
    elFooter.classList.remove('hide');
    renderReflectiveGallery();
    focusTxtInput()
    renderPopularList();
}

function showEditorModal() {
    document.querySelector('.main-gallery').classList.add('hide');
    let elEditModal = document.querySelector('.editor-modal');
    elEditModal.classList.remove('hide');
    let elFooter = document.querySelector('footer');
    elFooter.classList.add('hide');
    initEditor();
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
        allWordsAsEls.push(`<span onclick="onPopularClick(this)" class="popular-${i}">${mostPopularSearches[i]}</span>`)
    }

    // Rendering the list in a random order
    let strHtml = '';
    let randomUniqueNumList = genRandomUniqueNumList(allWordsAsEls.length);
    randomUniqueNumList.forEach(num => {
        strHtml += allWordsAsEls[num];
    })
    elPopularList.innerHTML = strHtml
}

function onShowMyMimes() {
    let elShowMyMimesBtn = document.querySelector('#show-my-mimes');
    // If already showing my memes:
    if (gIsShowingMyMemes) {
        elShowMyMimesBtn.innerHTML = 'Show my mimes';
        renderReflectiveGallery();
        gIsShowingMyMemes = false;
        return;
    }
    // If on gallery:
    elShowMyMimesBtn.innerHTML = 'Return to gallery';
    gIsShowingMyMemes = true;
    renderReflectiveGallery(gSavedMemes, true);
    if (!gSavedMemes || !gSavedMemes.length) {
        document.querySelector('.collection').innerHTML = '<h1>Nothing ready yet... Go Edit some memes!</h1>'
    }
    let crudImages = document.querySelectorAll('img');
    crudImages.forEach(img => img.classList.add('my-meme-crud'))
}

function onPopularClick(el) {
    gIsPopularKeywordPressed = true;
    let keyword = el.innerHTML;
    let elSearchInput = document.querySelector('#search-input');
    elSearchInput.value = keyword;
    searchImg(keyword)
    renderReflectiveGallery();
    gIsPopularKeywordPressed = false;
}

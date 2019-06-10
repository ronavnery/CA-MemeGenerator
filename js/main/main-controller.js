'use strict';

let gIsSearchOn;
let gIsShowingMyMemes;

function onInit() {
    init();
    renderReflectiveGallery();
    hideEditorModal();
    addEventListeners();
    renderDataList();
    // renderPopularList();
}

function addEventListeners() {
    let elSearchInput = document.querySelector('#search-input');
    let elWall = document.querySelector('#wall');
    elSearchInput.addEventListener('input', function () {
        elWall.style.transform = 'rotateY(45deg) translateX(0px)' // Scrolling to beginning of gallery on search
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
    // Add img keywords to popular keywords list
    addKeywordsAsPopular(id);
}
 
function hideEditorModal() {
    document.querySelector('.main-gallery').classList.remove('hide');
    let elEditModal = document.querySelector('.editor-modal');
    elEditModal.classList.add('hide');
    renderReflectiveGallery();
    // renderPopularList(); // Remove after we tranform editor modal into a page
    focusTxtInput()
    renderPopularList(); // Remove after we tranform editor modal into a page
}

function showEditorModal() {
    document.querySelector('.main-gallery').classList.add('hide');
    let elEditModal = document.querySelector('.editor-modal');
    elEditModal.classList.remove('hide');

    initEditor();
}

// function renderGallery() {
//     save();
//     let elGallery = document.querySelector('.gallery');
//     let htmlStr = '';
//     let images = getImagesForDisplay();

//     images.forEach(img => {
//         htmlStr += genGalleryItemHtml(img.id, img.src);
//     })
//     elGallery.innerHTML = htmlStr;
// }

// function genGalleryItemHtml(id, src) {
//     return `
//     <section class="gallery-item">
//     <img class="gallery-img" onclick=onImgClick(this) data-id="${id}" src="${src}">

//     </section>`
// }

function renderDataList() {
    let elDataList = document.querySelector('datalist');
    let strHtml = '';
    let keywords = getKeywordsDataList();
    keywords.forEach(keyword => {
        strHtml += `<option value="${keyword}">`
    })
    elDataList.innerHTML = strHtml;

}

// function renderPopularList() {
//     let elPopularList = document.querySelector('.popular-list');
//     let allWordsAsEls = []
//     let mostPopularSearches = getMostPopularSearches();
//     for (let i = 0; i < mostPopularSearches.length; i++) {
//         allWordsAsEls.push(`<span class="popular-${i}">${mostPopularSearches[i]}</span>`)
//     }

//     // Rendering the list in a random order
//     let strHtml = '';
//     let randomUniqueNumList = genRandomUniqueNumList(allWordsAsEls.length);
//     randomUniqueNumList.forEach(num => {
//         strHtml += allWordsAsEls[num];
//     })
//     elPopularList.innerHTML = strHtml
// }

function onShowMyMimes() {
    let elShowMyMimesBtn = document.querySelector('#show-my-mimes');
    if (gIsShowingMyMemes) {
        elShowMyMimesBtn.innerHTML = 'Show my mimes';
        renderReflectiveGallery();
        gIsShowingMyMemes = false;
        return;
    }
    elShowMyMimesBtn.innerHTML = 'Return to gallery';
    gIsShowingMyMemes = true;
    renderReflectiveGallery(gSavedMemes, true);
    if (!gSavedMemes || !gSavedMemes.length) {
        document.querySelector('.collection').innerHTML = '<h1>Nothing ready yet... Go Edit some memes!</h1>'
    }

}
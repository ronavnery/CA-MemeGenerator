'use strict';
 
let gNextId = 0;
let gImgs;
let gMeme;
let gSearchResults;
let gMostPopularKeywords;

function init() {
    load();
    saveImages();
}

function save() {
    savePopularList();
    saveImages();
}

function load() {
    loadImages();
    loadMyMemes();
    loadPopularList();
}

function saveImages() {
    saveToStorage('images', gImgs)
}

function loadImages() {
    try {
        gImgs = loadFromStorage('images')
    }
    catch (err) {
        console.log('load from storage failed. error:', err)
        gImgs = createImgs();
    }
    finally {
        if (!gImgs || !gImgs.length) {
            gImgs = createImgs();
        }
    }
}

function loadMyMemes() {
    gSavedMemes = loadFromStorage('editedImg')
}

function savePopularList() {
    console.log('saving');
    saveToStorage('popular-list', gMostPopularKeywords);
}

function loadPopularList() {
    try {
        gMostPopularKeywords = loadFromStorage('popular-list');
    }
    catch (err) {
        console.log('popular list load from storage failed. error:', err)
        gMostPopularKeywords = getInitialPopularList();
    }
    finally {
        if (!gMostPopularKeywords || !gMostPopularKeywords.length) {
            gMostPopularKeywords = getInitialPopularList();
        }
    }
}

function createMeme(id, src, color) {
    gMemeNumOfLines = 1;
    return {
        selectedImgId: id,
        src: src,
        txts: [createLine()]
    }
}

function createImgs() {
    return [
        createImg('img/memes/african-dance.jpg', ['cute', 'happy']),
        createImg('img/memes/Ancient-Aliens.jpg', ['weird', 'happy', 'funny']),
        createImg('img/memes/baby-suprised.jpg', ['cute', 'baby', 'funny']),
        createImg('img/memes/basketball-kiss.jpg', ['funny', 'sport', 'basketball']),
        createImg('img/memes/dog-stretch.jpg', ['cute', 'animals']),
        createImg('img/memes/dr-evil.jpg', ['funny', 'movie']),
        createImg('img/memes/hecht.jpg', ['funny', 'israel', 'people']),
        createImg('img/memes/heidi.jpg', ['happy', 'series']),
        createImg('img/memes/keyboard-cat.jpg', ['funny', 'cute', 'animals']),
        createImg('img/memes/laughing-baby.jpg', ['cute', 'funny', 'baby']),
        createImg('img/memes/leo.jpg', ['leonardo', 'selebs', 'actor']),
        createImg('img/memes/morphius.jpg', ['matrix', 'what', 'movie']),
        createImg('img/memes/obama-laugh.jpg', ['obama', 'politics', 'celeb', 'happy']),
        createImg('img/memes/one-does-not-simply.jpg', ['lord', 'what', 'if', 'movie']),
        createImg('img/memes/oprah.jpg', ['oprah', 'celeb']),
        createImg('img/memes/patrick.jpg', ['patrick', 'movie']),
        createImg('img/memes/poppies.jpg', ['cute', 'animals']),
        createImg('img/memes/putin.jpg', ['putin', 'politics']),
        createImg('img/memes/sleeping-baby-puppy.jpg', ['animals', 'baby', 'cute']),
        createImg('img/memes/success-baby.jpg', ['baby', 'cute']),
        createImg('img/memes/survivor.jpg', ['survivor', 'tv', 'series']),
        createImg('img/memes/thinking-purple.jpg', ['purple', 'willi', 'wanka', 'movie']),
        createImg('img/memes/toy-story.jpg', ['toy', 'story', 'movie']),
        createImg('img/memes/trump-rock.jpg', ['trump', 'funny', 'politics']),
        createImg('img/memes/trump.jpg', ['trump', 'funny', 'politics']),
    ]
}

function createImg(src, keywords) {
    return {
        id: gNextId++,
        src: src,
        keywords: keywords
    }
}

function getImagesForDisplay() {
    if (gIsSearchOn) return gSearchResults;
    else return gImgs;
}

// Search Function

function searchImg(searchTerm) {
    gSearchResults = gImgs.filter(img => {
        return img.keywords.join().includes(searchTerm);
    })
}

function getKeywordsDataList(isUnique = true) {
    let keywords = [];
    // Get all keywords from model
    gImgs.forEach(img => {
        img.keywords.forEach(keyword => {
            keywords.push(keyword);
        })
    })
    // Remove duplicates:
    if (isUnique) {
        return keywords.filter((value, idx, keywords) => {
            return keywords.indexOf(value) === idx;
        })
    } else return keywords;
}

function getInitialPopularList() {
    return ['baby','baby', 'movie','movie','movie', 'politics','funny','funny','funny','funny']
}

function getMostPopularSearches() {
    // Object as map for the most popular searches
    let res = {};
    gMostPopularKeywords.forEach(keyword => {
        if (!res[keyword]) res[keyword] = 0;
        res[keyword]++;
    })

    // Pushes to a new array the highest 6 values.
    let mostPopularSearches = [];
    let top;
    for (let i = 0; i < 6; i++) {
        top = Object.keys(res).reduce((a, b) => res[a] > res[b] ? a : b);
        res[top] = 0;
        mostPopularSearches.push(top);
    }

    // Removes duplicates
    mostPopularSearches = mostPopularSearches.filter(function(item, pos) {
        return mostPopularSearches.indexOf(item) == pos;
    })

    return mostPopularSearches;
}

function addKeywordsAsPopular(id) {
    gMostPopularKeywords.push(...gImgs[id].keywords);
}
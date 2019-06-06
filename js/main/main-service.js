'use strict';

let gNextId = 1;
let gImgs;
let gMeme;


function createMeme(id, src) {
     return {
        selectedImgId: id,
        src: src,
        txts: [
            {
                line: '',
                size: 20,
                align: 'left',
                color: 'white'
            }
        ]
    }
}

function createImgs() {
    return [
        createImg('img/memes/heidi.jpg', ['happy', 'series']),
        createImg('img/memes/trump.jpg', ['funny', 'politics']),
        createImg('img/memes/poppies.jpg', ['cute', 'animals'])
    ]
}

function createImg(src, keywords) {
    return {
        id: gNextId++,
        src: src,
        keywords: keywords
    }
}

function findImg(id) {
    return gImgs.find(img => { return (img.id === id) })
}





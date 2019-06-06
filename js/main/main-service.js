'use strict';

let gNextId = 1;
let gImgs;


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

// var gMeme = {
//     selectedImgId: 5,
//     txts: [
//         {
//             line: 'I never eat Falafel',
//             size: 20,
//             align: 'left',
//             color: 'red'
//         }
//     ]
// }
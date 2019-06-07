'use strict';

let gNextId = 1;
let gImgs;
let gMeme;
let gSearchResults;
let gCurrLine;

    function createMeme(id, src) {
        return {
            selectedImgId: id,
            src: src,
            txts: [
                {
                    position: 'top',
                    locX: gCanvas.width / 2,
                    locY: gCanvas.height * 0.125,
                    txt: '',
                    family: 'Impact',
                    size: 20,
                    align: 'left',
                    color: 'white'
                },
                {
                    position: 'bottom',
                    locX: gCanvas.width / 2,
                    locY: gCanvas.height * 0.875,
                    txt: '',
                    family: 'Impact',
                    size: 20,
                    align: 'left',
                    color: 'white'
                }
            ]
        }
    }



function createImgs() {
    return [
        createImg('img/memes/african-dance.jpg', ['cute', 'happy']),
        createImg('img/memes/Ancient-Aliens.jpg', ['weird', 'happy', 'funny']),
        createImg('img/memes/baby-suprised.jpg', ['cute', 'baby', 'funny']),
        createImg('img/memes/basketball-kiss.jpg', ['funny', 'sport', 'bascketball']),
        createImg('img/memes/dog-stretch.jpg', ['cute', 'animals']),
        createImg('img/memes/dr-evil.jpg', ['funny', 'movie']),
        createImg('img/memes/hecht.jpg', ['funny', 'movie', 'people']),
        createImg('img/memes/heidi.jpg', ['happy', 'series']),
        createImg('img/memes/keyboard-cat.jpg', ['funny', 'cute', 'animals']),
        createImg('img/memes/laughing-baby.jpg', ['cute', 'funny', 'baby']),
        createImg('img/memes/leo.jpg', ['Leonardo', 'selebs', 'actor']),
        createImg('img/memes/morphius.jpg', ['Matrix', 'what', 'movie']),
        createImg('img/memes/obama-laugh.jpg', ['Obama', 'politics', 'celeb', 'happy']),
        createImg('img/memes/one-does-not-simply.jpg', ['Lord', 'what', 'if', 'movie']),
        createImg('img/memes/oprah.jpg', ['Oprah', 'celeb']),
        createImg('img/memes/patrick.jpg', ['patrick', 'movie']),
        createImg('img/memes/poppies.jpg', ['cute', 'animals']),
        createImg('img/memes/putin.jpg', ['putin', 'politics']),
        createImg('img/memes/sleeping-baby-puppy.jpg', ['animals', 'baby', 'cute']),
        createImg('img/memes/success-baby.jpg', ['baby', 'cute']),
        createImg('img/memes/survivor.jpg', ['survivor', 'tv', 'series']),
        createImg('img/memes/thinking-purple.jpg', ['purple', 'Willi', 'Wanka', 'movie']),
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
    if (gIsSearchOn) {
        return gSearchResults;
    } else return gImgs;
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

// NATHALIE: Your changes are in comment, I didnt wont to delete just yet until u check again
// It didnt work when i tried.

function pickColor(color) {
     if(color === undefined) gCurrLine.color
    else if (gCurrLine === undefined) gCurrLine = gMeme.txts[0];
    gCurrLine.color = color
    // if (color === undefined) gCurrLine.color
    // else gCurrLine.color = color;

    draw();
}

function getCurrLineObj(line){
    gCurrLine = line
}

function setTxt(txt) {
    gCurrLine.txt = txt
}

function pickFamily(family){
    gCurrLine.family = family
    draw()
}

// I almost sure this function sould be im main-service (it was at editor-controller)
// If im wrong you can take it back.
function drawText(txt, x, y, color, family) {
    gCtx.restore()
    gCtx.textAlign = 'center';
    gCtx.font = `40px ${family}`;
    gCtx.lineWidth = 5;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = color;
    gCtx.lineJoin = 'round';
    gCtx.save()
    printAt(gCtx, txt, x, y, gCanvas.height - (gCanvas.height * 0.875), gCanvas.width - (gCanvas.width * 0.125))
}


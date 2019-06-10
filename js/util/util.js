'use strict';
 

function printAt(ctx, text, x, y, lineHeight, fitWidth) {
    fitWidth = fitWidth || 0;

    if (fitWidth <= 0) {
        ctx.strokeText(text, x, y);
        ctx.fillText(text, x, y);
        return;
    }

    for (let idx = 1; idx <= text.length; idx++) {
        let str = text.substr(0, idx);
        if (ctx.measureText(str).width > fitWidth) {
            ctx.strokeText(text.substr(0, idx - 1), x, y);
            ctx.fillText(text.substr(0, idx - 1), x, y);
            printAt(ctx, text.substr(idx - 1), x, y + lineHeight, lineHeight, fitWidth);
            return;
        }
    }
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
}

// Local storege functions:
function saveToStorage(key, value) {
    let strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

function genRandomUniqueNumList(length) {
    var randomUniqueNumList = []
    while (randomUniqueNumList.length < length) {
        var r = getRandomIntInclusive(0, length - 1);
        if (randomUniqueNumList.indexOf(r) === -1) randomUniqueNumList.push(r);
    }
    return randomUniqueNumList;
}
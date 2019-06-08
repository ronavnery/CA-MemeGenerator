'use strict';


// drawImageProp NOT USED AT THE MOMENT. DELETE IF NOT NEEDED
function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }

    // default offset is center
    offsetX = typeof offsetX === "number" ? offsetX : 0.5;
    offsetY = typeof offsetY === "number" ? offsetY : 0.5;

    // keep bounds [0.0, 1.0]
    if (offsetX < 0) offsetX = 0;
    if (offsetY < 0) offsetY = 0;
    if (offsetX > 1) offsetX = 1;
    if (offsetY > 1) offsetY = 1;

    let iw = img.width,
        ih = img.height,
        r = Math.min(w / iw, h / ih),
        nw = iw * r,   // new prop. width
        nh = ih * r,   // new prop. height
        cx, cy, cw, ch, ar = 1;

    // decide which gap to fill    
    if (nw < w) ar = w / nw;
    if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
    nw *= ar;
    nh *= ar;

    // calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);

    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;

    // make sure source rectangle is valid
    if (cx < 0) cx = 0;
    if (cy < 0) cy = 0;
    if (cw > iw) cw = iw;
    if (ch > ih) ch = ih;

    // fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}

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
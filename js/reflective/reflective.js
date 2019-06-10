

// setTimeout(renderReflectiveGallery, 1000);

function renderReflectiveGallery(imgs = getImagesForDisplay(), isBase64 = false) {
    let isBelow700 = window.matchMedia("(max-width: 700px)").matches
    let numOfRows;
    if (isBelow700) {
        numOfRows = 3;
    } else numOfRows = 2;

    const NUM_ROWS = numOfRows;
    const IMAGES = [];
    let imgsToDisplay = imgs;
    const NUM_IMAGES = imgsToDisplay.length;

    let elWall = document.querySelector('#wall');
    elWall.innerHTML = '';
    let prefix = ''
    for (let i = 0; i < NUM_IMAGES; i++) {
        if (!isBase64) prefix = './'
        IMAGES.push(prefix + imgsToDisplay[i].src);
    }

    let rows = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        rows.push(row);
    }

    let wall = document.getElementById('wall');
    for (let i = 0; i < IMAGES.length; i++) {
        let index = i % rows.length;
        let row = rows[index];
        let onBottomRow = index === rows.length - 1;
        if (onBottomRow) {
            let frame = document.createElement('div');
            frame.classList.add('frame');
            frame.innerHTML = `
      <img onclick="onImgClick(this)" data-id="${i}" src="${IMAGES[i]}">
      <div class="reflection">
        <img src="${IMAGES[i]}">
      </div>
    `;
            row.appendChild(frame);
        } else {
            let img = document.createElement('img');
            img.src = IMAGES[i];
            img.dataset.id = i;
            img.setAttribute('onclick', 'onImgClick(this)');
            row.appendChild(img);
        }
    }

    rows.forEach((row) => {
        wall.appendChild(row);
    });

    let debounce = (func, wait, immediate) => {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };



      

    let scrollPosition = 0;
    let scrollWall = debounce((event) => {
        scrollPosition -= event.deltaY;
        wall.style.transform = `rotateY(45deg) translateX(${scrollPosition}px)`;
    }, 10);

    window.addEventListener('wheel', scrollWall);

}




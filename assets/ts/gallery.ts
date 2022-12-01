import imagesLoaded = require('imagesloaded');

function resizeGridItem(item) {
    let grid = document.querySelector('ul.gallery');
    let rowHeight = parseInt(window.getComputedStyle(grid!).getPropertyValue('grid-auto-rows'));
    // rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    let rowSpan = Math.ceil((item.querySelector('img').getBoundingClientRect().height) / (rowHeight) * 0.8);
    item.style.gridRowEnd = "span " + rowSpan;
}

function resizeAllGridItems() {
    let allItems = document.querySelectorAll('ul.gallery li');
    for (let x = 0; x < allItems.length; x++) {
        resizeGridItem(allItems[x]);
    }
}

(document.querySelector('ul.gallery') as HTMLElement).style['grid-auto-rows'] = '1px';
window.onload = resizeAllGridItems;
imagesLoaded(document.querySelector('ul.gallery'), resizeAllGridItems);

window.addEventListener('resize', resizeAllGridItems);

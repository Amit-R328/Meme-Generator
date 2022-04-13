'use strict'

const STORAGE_KEY = 'memesDB'

var gMeme = {
    selectedIndex: 0,
    selectedIndexLine: 0,
    lines: [{
        txt: 'text...',
        size: 40,
        align: 'center',
        pos: {
            x: 250,
            y: 50,
        },
        fontFam: 'impact',
        colorFill: '#ffffff',
        colorStroke: '#000000',
        isDrag: false
    }]
}

function getMeme() {
    return gMeme
}

function setLinesPos(center) {
    gMeme.lines.forEach(line => line.pos.x = center)
}

function isLineClicked(pos) {
    return gMeme.lines.findIndex(line => {
        const x = line.pos.x;
        const y = line.pos.y;
        const lineHeight = line.size + 20;
        const lineWidth = gCtx.measureText(line.txt).width;;
        if (line.align === 'start') {
            return (pos.x > x &&
                pos.y > (y - (lineHeight / 2)) &&
                pos.x < x + lineWidth &&
                pos.y < (y - (lineHeight / 2)) + lineHeight);
        } else if (line.align === 'center') {
            return (pos.x > x - (lineWidth / 2) &&
                pos.y > (y - (lineHeight / 2)) &&
                pos.x < x - (lineWidth / 2) + lineWidth &&
                pos.y < (y - (lineHeight / 2)) + lineHeight);
        } else if (line.align === 'end') {
            return (pos.x > x - lineWidth &&
                pos.y > y - (lineHeight / 2) &&
                pos.x < x + lineWidth &&
                pos.y < (y - (lineHeight / 2)) + lineHeight);
        }
    })
}

function switchLine(lineIdx) {
    if (lineIdx || lineIdx === 0) gMeme.selectedIndexLine = lineIdx;
    else gMeme.selectedIndexLine = (gMeme.selectedIndexLine === (gMeme.lines.length - 1))
}

function setMeme(index) {
    gMeme.selectedIndex = index
}

function getSelectedLine() {
    return gMeme.lines[gMeme.selectedIndexLine];
}

function moveLine(dx, dy) {
    getSelectedLine().pos.x += dx;
    getSelectedLine().pos.y += dy;
}

function setLineDrag(isDrag) {
    if (gMeme.selectedIndexLine < 0) return;
    getSelectedLine().isDrag = isDrag;
 }


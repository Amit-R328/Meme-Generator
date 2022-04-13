'use strict'

const STORAGE_KEY = 'memesDB'
let isLine = true;
let gMemesDATAs;

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

function setLineTxt(txt) {
    if (gMeme.selectedIndexLine < 0) return
    getSelectedLine().txt = txt
}

function setColor(color, part) {
    if (gMeme.selectedIndexLine < 0) return;
    getSelectedLine()[part] = color;
}

function setFontSize(diff) {
    const line = getSelectedLine();
    if (gMeme.selectedIndexLine < 0) return;
    if ((line.size + diff) === 5 ||
        (line.size + diff) === 100) return;
    line.size += diff
}

function setFontFam(fontFam) {
    if (gMeme.selectedIndexLine < 0) return;
    getSelectedLine().fontFam = fontFam;
}

function setAlign(align) {
    if (gMeme.selectedIndexLine < 0) return;
    getSelectedLine().align = align;
    let x;
    if (align === 'start') x = 10;
    else if (align === 'center') x = gCanvas.width / 2;
    else if (align === 'end') x = gCanvas.width - 10;
    getSelectedLine().pos.x = x;
}

function addLine(txt = '*meme text*') {
    const line = {
        txt,
        size: 40,
        align: 'center',
        pos: {
            x: gCanvas.width / 2,
            y: gCanvas.height / 2
        },
        fontFam: 'impact',
        colorFill: '#ffffff',
        colorStroke: '#000000',
        isDrag: false
    }
    if (isLine) line.pos.y = gCanvas.height - 50;
    isLine = false;
    gMeme.lines.push(line);
    switchLine(gMeme.lines.length - 1);
}

function deleteLine() {
    if (gMeme.selectedIndexLine < 0) return;
    if (!getSelectedLine()) return;
    gMeme.lines.splice(gMeme.selectedIndexLine, 1);
    if (!gMeme.lines.length) gMeme.selectedIndexLine = - 1;
}

function setLineDrag(isDrag) {
    if (gMeme.selectedIndexLine < 0) return;
    getSelectedLine().isDrag = isDrag;
}


'use strict'

const STORAGE_KEY = 'memesDB'

let isLine = true
let gMemeData
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

function setMeme(index) {
    gMeme.selectedIndex = index
}

function addLine(txt = 'new Text'){
    const line = {
        txt,
        size: 40, 
        align: 'center',
        pos: {
            x: gCanvas.width / 2,
            y: gCanvas.height / 2,
        },
        fontFam: 'impact',
        colorFill: '#ffffff',
        colorStroke: '#000000',
        isDrag: false
    }
    if(isLine) line.pos.y = gCanvas.height - 50
    isLine = false
    gMeme.lines.push(line)
    switchLine(gMeme.lines.length - 1)
}

function setColor(color, part){
    if(gMeme.selectedIndexLine < 0) return
    getPickedLine()[part] = color
}

function setFontSize(diff){
    const line = getPickedLine()
    if(gMeme.selectedIndexLine < 0) return
    if((line.size + diff) === 5 || (line.size + diff) === 100) return
    line.size += diff
}

function setFontFam(fontFam){
    if(gMeme.selectedIndexLine < 0) return
    getPickedLine().fontFam = fontFam
}

function setAlign(align){
    if(gMeme.selectedIndexLine < 0) return
    getPickedLine().align = align
    let x
    if(align === 'start') x = 10
    else if(align === 'center') x = gCanvas.width / 2
    else if(align === 'end') x = gCanvas.width - 10
    getPickedLine().pos.x = x
}

function deleteLine(){
    if(gMeme.selectedIndexLine < 0) return
    if(!getPickedLine()) return
    gMeme.lines.splice(gMeme.selectedIndexLine, 1)
    if(!gMeme.lines.length) gMeme.selectedIndexLine = -1
}

function setLineText(txt) {
    if (gMeme.selectedIndexLine < 0) return
    getPickedLine().txt = txt
}

function getPickedLine() {
    return gMeme.lines[gMeme.selectedIndexLine]
}

function isLinePicked(pos) {
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

function switchLine(index) {
    if (index || index === 0) gMeme.selectedIndexLine = index
    else gMeme.selectedIndexLine = (gMeme.selectedIndexLine === (gMeme.lines.length - 1))
}

function setLineDrag(isDrag) {
    if (gMeme.selectedIndexLine < 0) return
    getPickedLine().isDrag = isDrag
}

function moveLine(dx, dy) {
    getPickedLine().pos.x += dx;
    getPickedLine().pos.y += dy;
}


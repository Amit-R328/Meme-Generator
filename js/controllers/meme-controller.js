'use strict'

let gCanvas
let gCtx
let gStartPos;
let gAspectRatio = 1
const gTouchEvs = ['touchmove', 'tuochend', 'touchstart'];

function initMeme(index) {
    console.log('initMeme')
    gCanvas = document.querySelector('#canvas')
    setCanvasSize(index)
    gCtx = gCanvas.getContext("2d")
    addMouseListeners()
    addTouchListeners()
    setMeme(index)
    onLoadMeme()
    resizeCanvas()
    window.addEventListener('resize', () => resizeCanvas());
}

function addMouseListeners() {
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gCanvas.addEventListener('touchmove', onMove)
    gCanvas.addEventListener('touchstart', onDown)
    gCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev);
    const clickedLineIdx = isLineClicked(pos);
    if (clickedLineIdx < 0) {
        switchLine(clickedLineIdx);
        renderMeme();
        return;
    }
    switchLine(clickedLineIdx);
    setLineDrag(true);
    gStartPos = pos;
    gCanvas.style.cursor = 'grabbing'
    renderMeme();
}

function onMove(ev) {
    const line = getSelectedLine();
    if (!line || !line.isDrag) return;
    const pos = getEvPos(ev);
    const dx = pos.x - gStartPos.x;
    const dy = pos.y - gStartPos.y;
    moveLine(dx, dy);
    gStartPos = pos;
    renderMeme();
}

function onUp() {
    setLineDrag(false);
    gCanvas.style.cursor = 'grab'
    // document.querySelector('input[name="txt"]').focus();
}

function onSetText(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onSetColor(color, part) {
    setColor(color, part);
    renderMeme();
}

function onSetFontSize(diff) {
    setFontSize(+diff);
    renderMeme();
}

function onSwitchLine() {
    switchLine();
    renderMeme();
    document.querySelector('input[name="txt"]').focus();
}

function onSetFontFam(fontFam) {
    setFontFam(fontFam);
    renderMeme();
}

function onSetAlign(align) {
    setAlign(align);
    renderMeme();
}

function onAddLine() {
    addLine();
    renderMeme();
}

function onDeleteLine() {
    deleteLine();
    renderMeme();
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    document.querySelector('input[name="txt"]').focus();
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        var rect = ev.target.getBoundingClientRect();
        var x = ev.targetTouches[0].pageX - rect.left;
        var y = ev.targetTouches[0].pageY - rect.top;
        pos = { x, y }
    }
    return pos
}

function resizeCanvas() {
    console.log('resize Canvas')
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = gCanvas.width
    setLinesPos(gCanvas.width / 2)
    renderMeme()
}

function onLoadMeme() {
    const meme = getMeme()
    const image = new Image()
    image.src = `./img/${meme.selectedIndex}.jpg`
    console.log(image.src)
    image.onload = () => {
        renderMeme()
    }
}


function setCanvasSize(index) {

    const elMeme = getElMemebyIdx(index).src
    const canvasWidth = elMeme.offsetWidth
    const canvasHeight = (elMeme.offsetHeight * 500) / canvasWidth
    gCanvas.height = canvasHeight
}


function renderMeme() {
    const meme = getMeme()
    const elImgToDisplay = getElMemebyIdx(meme.selectedIndex)
    gCtx.drawImage(elImgToDisplay, 0, 0, gCanvas.width, gCanvas.height)
    if (meme.lines.length) {
        meme.lines.forEach((line, i) => {
            drawLine(line);
            if (i === meme.selectedIndexLine && meme.selectedIndexLine >= 0) markSelectedLine(meme.lines[meme.selectedIndexLine]);
        })
    }

}

function markSelectedLine(line) {
    const { pos: { x, y }, align, size, txt } = line;
    const lineHeight = size + 20;
    const lineWidth = gCtx.measureText(txt).width;
    gCtx.beginPath();
    if (align === 'start') {
        gCtx.rect(x, y - (lineHeight / 2), lineWidth, lineHeight);
    } else if (align === 'center') {
        gCtx.rect(x - (lineWidth / 2), y - (lineHeight / 2), lineWidth, lineHeight);
    } else if (align === 'end') {
        gCtx.rect(x - lineWidth, y - (lineHeight / 2), lineWidth, lineHeight);
    }
    gCtx.lineWidth = 2;
    gCtx.strokeStyle = 'rgb(15,155,180)';
    gCtx.stroke();
    gCtx.closePath();
    renderLineValues(line);
}

function renderLineValues(line) {
    const ignore = ['size', 'align', 'pos', 'isDrag']
    console.log(line);
    Object.keys(line).forEach((prop) => {
        if (!ignore.includes(prop)) {
            console.log(prop);
            document.querySelector(`.tools-bar [name="${prop}"]`).value = line[prop];
        }
    })
}

function drawLine({ pos: { x, y }, txt, size, fontFam, colorFill, colorStroke, align }) {
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = align;
    gCtx.lineWidth = 1;
    gCtx.strokeStyle = colorStroke;
    gCtx.font = `${size}px ${fontFam}`;
    gCtx.fillStyle = colorFill;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function getElMemebyIdx(index) {
    return document.querySelector(`[src="./img/${index}.jpg"]`)
}
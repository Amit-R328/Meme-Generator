'use strict'

let gCanvas
let gCtx
let gStartPos;
let gAspectRatio = 1
const gTouchEvs = ['touchmove', 'tuochend', 'touchstart'];
const gStickers = ['🥰', '🚀', '🎉']
let gStickersIdx = 0
let gTxt = ''

function initMeme(index) {
    gCanvas = document.querySelector('#canvas')
    setCanvasSize(index)
    gCtx = gCanvas.getContext("2d")
    addMouseListeners()
    addTouchListeners()
    renderStickers()
    setMeme(index)
    onLoadMeme()
    if (isFlexible) {
        resizeCanvas(true)
    } else {
        resizeCanvas()
    }
    window.addEventListener('resize', () => resizeCanvas());
}



function renderStickers() {
    let strHtml = ''
    for (var i = gStickersIdx; i < gStickers.length; i++) {
        strHtml += `<button class="sticker" onclick="onStickerClick('${gStickers[i]}')">${gStickers[i]}</button>`
    }
    document.querySelector('.stickers').innerHTML = strHtml
}

function onStickerClick(sticker) {
    addLine(sticker)
    renderMeme()
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

function onSaveMeme() {
    renderMeme()
    const url = gCanvas.toDataURL()
    saveMeme(url)
    goTo('saved')
    renderSaved()
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
    image.onload = () => {
        renderMeme()
    }
}


function setCanvasSize(index) {
    const elTestImg = document.querySelector('.test-img')
    elTestImg.style.display = 'inline'
    if(index){
        const elMeme = getElMemebyIdx(index).src
        elTestImg.src = elMeme
    }
    // const canvasWidth = elMeme.offsetWidth
    const imgWidth = elTestImg.offsetWidth
    const imgHeight = elTestImg.offsetHeight
    const canvasHeight = (imgHeight * 500) / imgWidth
    gCanvas.height = canvasHeight
    elTestImg.style.display = 'none'
    gAspectRatio = imgWidth/imgHeight
}


function renderMeme() {
    const meme = getMeme()
    let elImgToDisplay = getElMemebyIdx(meme.selectedIndex)
    if(!meme.selectedIndex) elImgToDisplay = document.querySelector('.test-img')
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
    Object.keys(line).forEach((prop) => {
        if (!ignore.includes(prop)) {
            document.querySelector(`.tools-bar [name="${prop}"]`).value = line[prop];
        }
    })
}

function onDownload(elLink) {
    let img = gCanvas.toDataURL('image/jpeg')
    elLink.href = img
}

function onShare() {
    let img = gCanvas.toDataURL('image/jpeg')
    const formData = new FormData()
    formData.append('img', img)
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            saveMeme(url)
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    document.querySelector('.share-btn').innerHTML = `
    <ahref="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">   
    share
    </a>`
}

function drawLine({ pos: { x, y }, txt, size, fontFam, colorFill, colorStroke, align }) {
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = align;
    gCtx.lineWidth = 1;
    gCtx.font = `${size}px ${fontFam}`;
    gCtx.strokeStyle = colorStroke;
    gCtx.fillStyle = colorFill;
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}


function getElMemebyIdx(index) {
    return document.querySelector(`[src="./img/${index}.jpg"]`)
}
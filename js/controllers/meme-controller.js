'use strict'

let gCanvas
let gCtx
let gAspectRatio=1

function initMeme(index){
    console.log('initMeme')
    gCanvas = document.querySelector('#canvas')
    setCanvasSize(index)
    gCtx = gCanvas.getContext("2d")
    setMeme(index)
    onLoadMeme()
    resizeCanvas()
    window.addEventListener('resize', () => resizeCanvas());
}

function resizeCanvas(){
    console.log('resize Canvas')
    const elContainer = document.querySelector('.canvas-container')
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = gCanvas.width
    setLinesPos(gCanvas.width/2)
    renderMeme()
}

function onLoadMeme(){
    const meme = getMeme()
    const image = new Image()
    image.src = `./img/${meme.selectedIndex}.jpg`
    console.log(image.src)
    image.onload = () => {
        renderMeme()
    }
}


function setCanvasSize(index){
    
    const elMeme = getElMemebyIdx(index).src
    const canvasWidth = elMeme.offsetWidth
    const canvasHeight = (elMeme.offsetHeight * 500) / canvasWidth
    gCanvas.height = canvasHeight

}


function renderMeme(){
    console.log('render mame')
    const meme = getMeme()
    const elImgToDisplay =  getElMemebyIdx(meme.selectedIndex)
    console.log(elImgToDisplay)
    gCtx.drawImage(elImgToDisplay, 0, 0, gCanvas.width, gCanvas.height)
    
}

function getElMemebyIdx(index){
    return document.querySelector(`[src="./img/${index}.jpg"]`)
}
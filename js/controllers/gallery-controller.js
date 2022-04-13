'use strict'

function initGallery(){
    renderGallery()
}

function renderGallery(){
    let memes = getMemes()
    let imgHtml =  memes.map(meme => {
        return `<img src="./img/${meme.idx}.jpg" class="meme" onclick="onPickMeme(${meme.idx})"/>`
    })
    const elMemesDiv = document.querySelector('.memes')
    elMemesDiv.innerHTML = imgHtml.join('')
}

function onPickMeme(index){
    openEdit()
    initMeme(index)
}

function openEdit(){
    goTo('editor')
    document.body.classList.add('editor-page')
}
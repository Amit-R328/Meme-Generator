'use strict'



function initGallery(){
    createKeywordList()
    renderKeywords()
    renderGallery()
}

function renderGallery(keyword){
    document.querySelector('.more-btn').innerHTML = 'More'
    let memes = getMemes(keyword)
    let imgHtml =  memes.map(meme => {
        return `<img src="./img/${meme.idx}.jpg" class="meme" onclick="onPickMeme(${meme.idx})"/>`
    })
    if(!memes.length) imgHtml = ['<p> No result found...</p>']
    imgHtml.unshift('<label class="file-input gallery-img" name="image" onchange="onImgInput(event)"><span>+ load photo</span><input type="file"/></label>')
    const elMemesDiv = document.querySelector('.memes')
    elMemesDiv.innerHTML = imgHtml.join('')
    if (!keyword) document.querySelector('.search-line input').value = ''
}

function onImgInput(ev) {
    loadImageFromInput(ev, DrawUploadedImg)
}

function DrawUploadedImg(img) {
    document.querySelector('.test-img').src = img.src
    onPickMeme(0)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()
    reader.onload = (event) => {
        let img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderKeywords(isMoreOpen){
    const keyWordsSet = getKeyword()
    let keywordsNum = (isMoreOpen) ? keyWordsSet.length : 8
    let datalistHtml = ''
    let keywordFilter = []
    keyWordsSet.forEach(keyword => {
        datalistHtml += `<option value="${keyword.name}"></option>`
        keywordFilter.push(`<button style="font-size:${keyword.searchCount * 0.5 + 13}px;" onclick="onkeyword('${keyword.name}')">${keyword.name}</button>`)
    })
    keywordFilter.unshift('<button class="all-btn" onclick="renderGallery()">All</button>')
    document.querySelector('#keywordsData').innerHTML = datalistHtml
    document.querySelector('.filter-words-container').innerHTML = keywordFilter.slice(0, keywordsNum).join('')
}

function onkeyword(keyWord) {
    console.log('keyWord', keyWord )
    updateKeywordCount(keyWord)
    document.querySelector('.search-line input').value = keyWord
    renderKeywords()
    renderGallery(keyWord)
}

function onMoreKeywords(elMoreBtn){
    const isOpen = (elMoreBtn.innerText === 'More')
    elMoreBtn.innerText = (isOpen) ? 'Less' : 'More'
    renderKeywords(isOpen)
}

function onToggleMenu() {
    document.querySelector('nav').classList.toggle('open');
    document.querySelector('.main-screen').classList.toggle('open');
} 

function isFlexible(){
    let memesLength = getMemes().length
    let index = getRandomIntInclusive(0, memesLength -1)
    onPickMeme(index, true)
    let txt = getRandomTxt()
    onSetText(txt)
    let color1 = getRandomColor()
    let color2 = getRandomColor()
    onSetColor(color1, 'colorFill')
    onSetColor(color2, 'colorStroke')
}

function renderSaved(){
    const MemeDatas = getMemesData()
    let strHtml = []
    strHtml = MemeDatas.map((memeData, i) => `<div class="meme"><img src="${memeData}"></div>`)
    document.querySelector('.saved .memes').innerHTML = strHtml.join('')
}

function onPickMeme(index, isFlexible = false){
    openEdit()
    initMeme(index, true)
}

function openEdit(){
    goTo('editor')
    document.body.classList.add('editor-page')
}
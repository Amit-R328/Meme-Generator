'use strict'

let gKeyWords = []
let gMemes = [
    {idx: 1, keyWords: ['batman', 'superhero', 'men']},
    {idx: 2, keyWords: ['road', 'car']},
    {idx: 3, keyWords: ['man', 'game']},
    {idx: 4, keyWords: ['man']},
    {idx: 5, keyWords: ['child', 'cute']},
    {idx: 6, keyWords: ['dog', 'animal', 'cute']},
    {idx: 7, keyWords: ['child', 'cute']},
    {idx: 8, keyWords: ['man']},
    {idx: 9, keyWords: ['child', 'cute']},
    {idx: 10, keyWords: ['man']},
    {idx: 11, keyWords: ['men']},
    {idx: 12, keyWords: ['man']},
    {idx: 13, keyWords: ['man']},
    {idx: 14, keyWords: ['man']},
    {idx: 15, keyWords: ['man']},
    {idx: 16, keyWords: ['man']},
    {idx: 17, keyWords: ['man']},
    {idx: 18, keyWords: ['toys', 'cute']},
]

function createKeywordList(){
    const set = new Set()
    gMemes.forEach(meme => meme.keyWords.forEach(keyWord => set.add(keyWord)))
    set.forEach(keyWord => gKeyWords.push({name: keyWord, searchCount: 0}))
}

function getKeyword(){
    return gKeyWords
}

function updateKeywordCount(keyWordSearched){
    const keyWordObj = gKeyWords.find(keyWord => keyWord.name === keyWordSearched)
    if(!keyWordObj || keyWordSearched.searchCount === 30) return
    keyWordObj.searchCount++
}

function getMemes(keyWord){
    if(!keyWord) return gMemes
    return gMemes.filter(meme => {
        const regex = new RegExp('^' + keyWord, 'm')
        return meme.keyWords.find(keyWord => keyWord.match(regex))
    })
}

function setLineDrag(isDrag){
    if (gMeme.selectedIndexLine < 0) return
    getSelectedLine().isDrag = isDrag
}
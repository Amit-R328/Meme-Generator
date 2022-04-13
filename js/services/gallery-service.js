'use strict'

let gMemes = [
    {idx: 0, },
    {idx: 1, },
    {idx: 2, },
    {idx: 3, },
    {idx: 4, },
    {idx: 5, }
]

function getMemes(){
    return gMemes
}

function setLineDrag(isDrag){
    if (gMeme.selectedIndexLine < 0) return
    getSelectedLine().isDrag = isDrag
}
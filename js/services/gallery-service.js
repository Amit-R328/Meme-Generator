'use strict'

let gMemes = [
    {idx: 1, },
    {idx: 2, },
    {idx: 3, },
    {idx: 4, },
    {idx: 5, },
    {idx: 6, },
    {idx: 7, },
    {idx: 8, },
    {idx: 9, },
    {idx: 10, },
    {idx: 11, },
    {idx: 12, },
    {idx: 13, },
    {idx: 14, },
    {idx: 15, },
    {idx: 16, },
    {idx: 17, },
    {idx: 18, },
]

function getMemes(){
    return gMemes
}

function setLineDrag(isDrag){
    if (gMeme.selectedIndexLine < 0) return
    getSelectedLine().isDrag = isDrag
}
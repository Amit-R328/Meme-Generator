'use strict'

const STORAGE_KEY = 'memesDB'

var gMeme = {
    selectedIndex: 0,
    font: 'impact',
    colorFill: '#fff',
    colorStroke: '#000',
    selectedIndexLine: 0,
    lines: [{
        txt:'text...',
        size: 40,
        align: 'center',
        pos: {
            x: 250,
            y: 50,
        },
    }]
}

function getMeme(){
    return gMeme
}

function setLinesPos(center){
    gMeme.lines.forEach(line => line.pos.x = center)
}

function setMeme(index){
    gMeme.selectedIndex = index 
}


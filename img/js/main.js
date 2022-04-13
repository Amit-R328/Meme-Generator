'use strict'

const pages= ['gallery','editor']

function onInit(){
    initGallery()

}

function goTo(page){
    pages.forEach(page => {
         document.querySelector(`.${page}`).classList.add('hidden')
    })
    document.querySelector(`.${page}`).classList.remove('hidden')
}


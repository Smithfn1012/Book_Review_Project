let bookContainer = document.querySelector(".book-container")
let showBookDiv = document.querySelector(".show-book")
let formContainer = document.querySelector('.form-container')
let genreFormContainer = document.querySelector('.genre-form-container')
let genreContainer = document.querySelector('.genre-container')
let featuredBooks = document.querySelector('.featured-books')
let logo = document.querySelector('#logo')
let hardRule = document.createElement('hr')

logo.addEventListener('click', ()=>{
    featuredBooks.innerHTML = ''
    renderFeaturedBooks()
})
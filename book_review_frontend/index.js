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

renderFeaturedBooks()

  function fetchAllBooks() {
      return fetch(`${bookIndexUrl}`)
      .then(r => r.json())
  }

  function fetchAllGenres() {
      return fetch(genresIndexUrl)
      .then(r => r.json())
  }

  function fetchFeaturedBooks(averageReviewObj) {
      return fetch(`${bookIndexUrl}/${averageReviewObj.bookId}`)
      .then(r => r.json())
  }

  function fetchCreateBook(bookDetails) {

    const newBook = {
        title: capitalize(bookDetails['book-title'].value.toLowerCase()),
        author: capitalize(bookDetails['book-author'].value.toLowerCase()),
        image: bookDetails['book-image'].value,
        genre_id: parseInt(bookDetails['book-genre'].value),
        abstract: bookDetails['book-abstract'].value,
        fiction: bookDetails.fiction.checked
    }
    const configObj = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(newBook)
    }
    return fetch(`${bookIndexUrl}`, configObj)
        .then(r => r.json())
}
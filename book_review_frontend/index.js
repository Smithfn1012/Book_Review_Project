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

function fetchCreateReview(review, book) {
    const newReview = {
        stars: review.starts.value,
        content: review.content.value,
        book_id: book.id,
    }

    const configObj = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(newReview)
    }

    return fetch(`${reviewIndexUrl}`, configObj)
        .then(r=>r.json())
}

function fetchUpdateReadThroughs(book) {
    book.attributes.read_throughs++
    const configObj = {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            read_throughs: book.attributes.read_throughs
        })
    }

    return fetch(`${bookIndexUrl}/${book.id}`, configObj)
        .then(r => r.json())
}

function renderErrorMessage(){
    bookContainer.innerHTML = '';
    let bookHeader = document.createElement("h3")
    bookHeader.innerText = 'No books found - Please search again or create a new book!'
    let bookButton = document.createElement("button")
    bookButton.innerText = "Create Book"
    bookButton.addEventListener("click", (e) => {
        createBook()
    })
    bookContainer.append(bookHeader, bookButton)

}
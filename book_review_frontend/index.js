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

function createBook(){
    showBookDiv.innerHTML = ''
    bookContainer.innerHTML = `
        <form>
            Book Title: <input name="book-title" required placeholder="Enter a book title..."><br>
            Author: <input name="book-author" required placeholder="Enter a book author..."><br>
            Image Url: <input name="book-image" required placeholder="Enter a book image_url..."><br>
            Genre: <select name="book-genre" placeholder="Enter a book genre..."></select><br>
            Book Abstract: <textarea name="book-abstract" required placeholder="Enter a book abstract..."></textarea><br>
            Fiction?: <input type="checkbox" name="fiction" ><br>
            Create Book: <button>Submit</button>
        </form>
    `
    let closeButton = document.createElement('button')
    closeButton.innerText = 'I changed my mind!'
    closeButton.addEventListener('click', e => {
        genreContainer.innerHTML = ''
        bookContainer.innerHTML= ''
    })
    bookContainer.append(closeButton)
    const newBookForm = bookContainer.querySelector('form')
    const genreSelect = newBookForm.querySelector('select')
        fetchAllGenres().then(json => {
            json.data.forEach(genre =>{
                let genreOption = document.createElement('option')
                genreOption.innerText = genre.attributes.name
                genreOption.value = genre.id
                genreSelect.append(genreOption)
            })
        })
    newBookForm.addEventListener('submit', (e)=>{
        e.preventDefault()
        fetchCreateBook(e.target).then(book => {
            bookContainer.innerHTML ='Successfully created a new book!'
            showBookDetails(book.data)})
    })
    
}

function renderAFilteredBook(book){
    let bookLi = document.createElement("li")
    bookLi.innerHTML = ` <strong><em>Title:</em></strong> ${book.attributes.title} - <em>Author:</em> ${book.attributes.author}`
    bookContainer.append(bookLi)
    bookLi.addEventListener("click", (e) => {
        showBookDetails(book)
    })
}

let searchBar = document.createElement("form")
let input = document.createElement("input")
input.name = "book-title"
input.placeholder = "Enter a book title or author..."
input.style.width = '20vw'
let searchButton = document.createElement("button")
searchButton.innerText = "Submit"

searchBar.append(input, searchButton)
searchBar.addEventListener("submit", (e) => {
    e.preventDefault()
    // showBookDiv.innerHTML = '';
    genreContainer.innerHTML = ''
    fetchAllBooks()
        .then(books => {
            if(e.target['book-title'].value === ""){
                window.alert("You sent a blank search.  Please enter a book title or author.")
            } else {
                let bookMatches = books.data.filter(book => book.attributes.title.includes(capitalize(e.target['book-title'].value.toLowerCase())) || book.attributes.author.includes(capitalize(e.target['book-title'].value.toLowerCase())))
                if(bookMatches[0]){
                    bookContainer.innerHTML = '<h3>Search Results</h3>'
                    bookMatches.forEach(book =>{ 
                        renderAFilteredBook(book)
                    })
                } else {
                    renderErrorMessage()
                }
            }
            searchBar.reset()
        })
})
formContainer.append(searchBar)

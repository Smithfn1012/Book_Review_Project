# Book_Review_Project
A light-weight book review app.

In this project a user can:
Create a book showing the cover title, author, image, abstract, and genre through a POST request
Create a review of a book showing both text content and a 1-5 rating represented through star icons
Filter for books by title, author, or genre
Update the number of times the book has been read

Prerequisites:
Backend:

Rails 5
Fast JSON API
PostgreSQL


Frontend:

Vanilla Javascript

Installing:
Backend:
Clone the backend repo and run the rails server by:
$git clone git@github.com:Smithfn1012/Book_Review_Project/book_review_backend.git
$cd book_review
$bundle install
$rails db:migrate
$rails db:seed
$rails s

Frontend:
Clone the frontend repo and open the home html file
$git clone git@github.com:Smithfn1012/Book_Review_Project/book_review_frontend.git
$cd book_review_frontend
$open index.html

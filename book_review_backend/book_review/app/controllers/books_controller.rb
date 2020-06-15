class BooksController < ApplicationController
    def index
        books = Book.all
        render json: BookSerializer.new(books)
    end

    def show
        book = Book.find_by(id: params[:id])
        render json: BookSerializer.new(book)
    end
end

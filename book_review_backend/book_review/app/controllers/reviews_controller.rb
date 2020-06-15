class ReviewsController < ApplicationController
    def index
        reviews = Review.all
        render.json: ReviewSerializer.new(reviews)
    end

    def create
        review = Review.create(create_review_params)
        render json: ReviewSerializer.new(review)
    end
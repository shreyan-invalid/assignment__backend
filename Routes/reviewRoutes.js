const express = require("express");
const router = express.Router();
const reviewController = require("../Controllers/reviewController");


router.post('/postReview', reviewController.postReview);

router.get('/getReview/:productId', reviewController.getReviews);


module.exports= router;
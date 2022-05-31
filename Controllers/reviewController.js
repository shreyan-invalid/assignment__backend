const Review = require("../models/reviewModel");


const postReview = async(req, res, next) => {
    try{
        const newReview = new Review({
            userid: req.body.userid,
            reviews: req.body.reviews,
            date: Date.now(),
            name: req.body.name,
            email:req.body.email,
            rating: req.body.rating,
            productId: req.body.productId,
        })

        await newReview.save();
        res.json({
            data: newReview
        })
    }catch(err){
        next(err)
    }
}

const getReviews = async(req, res, next) => {
    try{
        Review.find({ productId: req.params.productId}, function (err, reviews) {
            if (err){
                next(err);
            }
            else{
                res.json({data: reviews})
            }
        });
    }catch(err){
        next(err);
    }
}

module.exports ={
    postReview,
    getReviews
}
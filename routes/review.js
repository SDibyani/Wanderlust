// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const wrapAsync =require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {reviewSchema}=require("../schema.js");
// const Review = require("../models/review.js");
// const Listings = require("../models/listing.js");


// const validateReview=(req,res,next)=>{
//     let {error}=reviewSchema.validate(req.body);
//       if(error){
//         let errMsg = error.details.map((el)=> el.message).join(",");
//         throw new ExpressError(404,errMsg);
//       }  else{
//         next();
//       }
//   };

// // //REVIEWS 
//   // POST ROUTE
// router.post(
//     "/",
//      validateReview,
//      wrapAsync(async (req, res) => {
//         console.log
//     console.log("Received review:", req.body.review); // Debugging
//     let listing = await Listing.findById(req.params.id);
    
//     if (!listing) {
//         return res.status(404).send("Listing not found");
//     }

//     let newReview = new Review(req.body.review);
//     await newReview.save();

//     listing.reviews.push(newReview._id);
//     await listing.save();

//     console.log("New review saved:", newReview);
//     res.redirect(`/listings/${listing._id}`);
// }));


// //DELETE REVIEW ROUT
// router.delete(
//     "/:reviewId",
//     wrapAsync(async(req,res)=>{
//       let {id,reviewId}= req.params;
  
//       await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});
//       await Review.findByIdAndDelete(reviewId);
//       res.redirect(`/listings/${id}`);
//     })
//   );

//   module.exports = router;
  






const express = require("express");
const router = express.Router({mergeParams:true});
const mongoose = require("mongoose");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js"); // Fix variable name
const {validateReview,isLoggedIn,isReviewAuthor}= require("../middlewire.js");

const reviewController = require("../controllers/reviews.js");




// POST REVIEW
// router.post(
//   "/",
//   isLoggedIn,
//   validateReview,
//   wrapAsync(async (req, res) => {
//     console.log(req.params.id);
//     console.log("Received review:", req.body);

//     let listing = await Listing.findById(req.params.id);
//     if (!listing) {
//       return res.status(404).send("Listing not found");
//     }

//     let newReview = new Review(req.body.review);
//     await newReview.save();
//      newReview.author = req.user._id;
    
   

//     listing.reviews.push(newReview._id);
//     await listing.save();

//     console.log("New review saved:", newReview);
//     req.flash("success", "New review saved");
//     res.redirect(`/listings/${listing._id}`);
//   })
// );

router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview));
     


     



// DELETE REVIEW
router.delete(
  "/:id/reviews/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview
));

module.exports = router;

  
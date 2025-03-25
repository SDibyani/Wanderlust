const Listing = require("../models/listing");
const Review = require("../models/review");
const mongoose = require("mongoose");


module.exports.createReview =async (req, res) => {
    console.log(req.params.id);
    console.log("Received review:", req.body);

    let listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).send("Listing not found");
    }

    // ✅ Assign the author before saving
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    await newReview.save();
     


     // ✅ Now `author` is included

    listing.reviews.push(newReview._id);
    await listing.save();

    console.log("New review saved:", newReview);
    req.flash("success", "New review saved");
    res.redirect(`/listings/${listing._id}`);
  };


  module.exports.destroyReview =async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
     req.flash("success", "Review deleted");
    res.redirect(`/listings/${id}`);
  }
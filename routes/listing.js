const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const wrapAsync =require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,saveRedirectUrl,isOwner,validateListing}= require("../middlewire.js");

const listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage}= require("../cloudConfig.js");
const upload = multer({ storage });



router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    // upload.single("listing[image]"),
    // upload.single("image") , // Correct field for Cloudinary uploads
    upload.single("listing[image]"),

    validateListing,
    wrapAsync(listingController.createListing)
  );
  

// NEW ROUTE
router.get("/new",isLoggedIn,saveRedirectUrl,listingController.renderNewForm);


// router
//   .route("/:id")
//   .get(wrapAsync(listingController.showListing))
//   .put(
//    isLoggedIn,
//     isOwner,
//     upload.single("listing[image]"),
//     validateListing,
//     wrapAsync(listingController.updateListing)
//   )
//   .delete(
//     isLoggedIn,
//     isOwner,
//     wrapAsync(listingController.destroyListing)
//   );




router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    (req, res, next) => {
      console.log("📦 Multer Middleware Triggered!");
      console.log("🖼 Uploaded File Data:", req.file); // ✅ Debugging log
      next();
    },
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );







 
 // EDIT ROUTE
 router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
  );

  module.exports=router;
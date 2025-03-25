const  Listing = require("../models/listing");
const mongoose = require("mongoose");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({accessToken:mapToken});

module.exports.index=async(req,res)=>{
    const allListings = await Listing.find({});
       res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing =async (req, res) => {
    let { id } = req.params;

    // Ensure the id is a valid ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", "Invalid Listing ID!");
      return res.redirect("/listings"); // ✅ Redirect instead of sending error
    }

    const listing = await Listing.findById(id)
    .populate({
      path:"reviews",
      populate:{
      path:"author",
      select:"username"
    }
  })
    .populate("owner");

    // If listing is not found, flash error & redirect
    if (!listing) {
      req.flash("error", "Cannot find that listing!");
      return res.redirect("/listings"); // ✅ Stops execution after redirect
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
  };

  module.exports.createListing =async (req,res,next)=>{
    let response = await geocodingClient
    .forwardGeocode({
      query:req.body.listing.location,
      limit:1,
    })
    .send();


    let url = req.file.path;
    let filename = req.file.filename;
      // console.log(url, "..",filename);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,filename};

    newListing.geometry = response.body.features[0].geometry;

   let savedListing = await newListing.save();
   console.log(savedListing);
   console.log("Geocoding response:", response.body.features[0].geometry);
    
    req.flash("success", "New Listing Created !");
     res.redirect("/listings");
  }; 


//   module.exports.createListing = async (req, res, next) => {
//     console.log("REQ FILE DATA:", req.file); // Debugging log

//     if (!req.file) {
//         req.flash("error", "Image upload failed. Please try again.");
//         return res.redirect("/listings/new"); // Prevent saving without an image
//     }

//     const { path: url, filename } = req.file; // Destructuring for clarity

//     const newListing = new Listing({
//         ...req.body.listing,
//         owner: req.user._id,
//         image: { url, filename }  // Correct data structure
//     });

//     await newListing.save();

//     console.log("✅ Saved Listing:", newListing);  // Final success log
//     req.flash("success", "New Listing Created!");
//     res.redirect("/listings");
// };






//   module.exports.renderEditForm =async(req,res)=>{
//     let {id} =req.params;
//     const listing = await Listing.findById(id);
//     if(!listing){
//       req.flash("error", "Cannot find that listing!");
//        res.redirect("/listings");
//     }

//     let originalImageUrl = listing.image.url;
//     originalImageUrl =originalImageUrl.replace("/upload","/upload/w_250");
//     res.render("listings/edit.ejs",{listing});
// };


module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
      req.flash("error", "Cannot find that listing!");
      return res.redirect("/listings"); // ✅ Added return to stop execution
  }

  // Ensure listing has an image before accessing .url
  let originalImageUrl = listing.image ? listing.image.url : "";

  if (originalImageUrl) {
      originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  }

  res.render("listings/edit.ejs", { listing, originalImageUrl }); // ✅ Pass originalImageUrl
};


















module.exports.updateListing =async(req,res)=>{ 
    let {id}=req.params;
    let listing =await Listing.findByIdAndUpdate(id,{...req.body.listing});
     
    if(typeof req.file !=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image={url,filename};
    await listing.save();
    }
    req.flash("success", "Listing Updated !");
    res.redirect(`/listings/${id}`);
};



module.exports.destroyListing =async(req,res)=>{
    let {id}=req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted !");
    res.redirect("/listings");
};
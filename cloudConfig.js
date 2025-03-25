const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowedFormats: ["png","jpg","jpeg"],
     
    },
  });

  cloudinary.api.ping()
    .then(result => console.log("✅ Cloudinary connected:", result))
    .catch(err => console.error("❌ Cloudinary connection error:", err));


  module.exports ={
    cloudinary,
    storage,
  };      



// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// });

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "wanderlust_DEV",
//         format: async (req, file) => "jpeg", // Fix format handling
//         public_id: (req, file) => file.originalname.split(".")[0] + "-" + Date.now()
//     }
// });

// cloudinary.api.ping()
//     .then(result => console.log("✅ Cloudinary Connected:", result))
//     .catch(err => console.error("❌ Cloudinary Connection Error:", err));


// const upload = multer({ storage });

// module.exports = {
//     cloudinary,
//     storage,
//     upload
// };






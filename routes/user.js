
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlewire.js");

const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(
   saveRedirectUrl,  // ✅ Store previous page before login
  passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
  }),
  userController.login
);



// router.post(
//     "/login",
//     saveRedirectUrl,
//     passport.authenticate("local",{
//         failureRedirect:"/login",
//         failureFlash:true,
//     }),
//     async(req,res)=>{
//         req.flash("success","welcome back to wanderlust!");
//         res.redirect(res.locals.redirectUrl );

//     });





router.get("/logout",userController.logout);



module.exports = router;
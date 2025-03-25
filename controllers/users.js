const mongoose = require("mongoose");
const User = require("../models/user");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.signup =async (req, res, next) => {
      try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
          if (err) return next(err);
          req.flash("success", "Welcome to Wanderlust!");
          return res.redirect("/listings"); // ✅ Redirect only after login succeeds
        });
  
      } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
      }};

module.exports.renderLoginForm =(req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login =async(req, res) => {
    console.log("Redirecting to:", req.session.returnTo); 
    const redirectUrl = req.session.returnTo || "/listings"; // ✅ Use saved URL or default
    delete req.session.returnTo; // ✅ Clear session after redirect
    req.flash("success", "Welcome back to Wanderlust!");
    res.redirect(redirectUrl);
};


module.exports.logout =(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return  next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    });
};
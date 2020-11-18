const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (email === "" || password === "") {
    res.render("auth/signup", { message: "Indicate email and password" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      email,
      password: hashPass,
      first: true
    });

    newUser.save()
    .then((user) => {
      req.user = user
      console.log(req.user)
      res.redirect("/dashboard");
    })
    .catch(err => {
      res.render("/signup", { message: "Something went wrong" });
    })
  });
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/auth/facebook", passport.authenticate("facebook"))

router.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/dashboard",
  failureRedirect: "/login"
}))

router.get("/auth/google", passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
}))

router.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/dashboard",
  failureRedirect: "/login"
}))

module.exports = router;

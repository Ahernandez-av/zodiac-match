
module.exports = (req, res, next) => {
  console.log(req.user, "👩")
  if (!req.user.first) next();
  else res.redirect('/create-profile');
};
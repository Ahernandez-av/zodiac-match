module.exports = (req, res, next) => {
  if (!req.user.first) next();
  else res.redirect('/create-profile');
};
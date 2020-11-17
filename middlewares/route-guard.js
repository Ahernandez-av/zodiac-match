module.exports = (req, res, next) => {
  console.log(req)
  if (req.user) next();
  else res.redirect('/login');
};
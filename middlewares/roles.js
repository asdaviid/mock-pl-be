module.exports.isAdmin = (req, res, next) => {
  const authorized = req.user.role === 'admin';

  console.log(req.user);

  if (!authorized) {
    return res.status(403).send('Unauthorized');
  }

  next();
}
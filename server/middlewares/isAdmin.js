const isAdmin = (req, res, next) => {
  if (req.user.is_admin || req.user.is_cashier) {
    return next();
  }
  return res.status(403).send({
    status: res.statusCode,
    error: 'Sorry! Admin permission is required.',
  });
};

export default isAdmin;

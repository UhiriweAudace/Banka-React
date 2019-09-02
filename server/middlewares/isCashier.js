const isCashier = (req, res, next) => {
  if (req.user.is_cashier === true) {
    return next();
  }
  return res.status(403).send({
    status: res.statusCode,
    error: 'Only Cashier are allowed to perfom this operation!.',
  });
};

export default isCashier;

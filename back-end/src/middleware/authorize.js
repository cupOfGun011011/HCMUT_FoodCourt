const auth = (req, res, next, type) => {
  const user = req.user;
  if (user.userType !== type)
    res.status(401).send({ error: "User is not manager" });
  next();
};

module.exports = auth;

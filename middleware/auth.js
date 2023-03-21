const jwt = require("jsonwebtoken");

const config = process.env;
process.env.TOKEN_KEY

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

const generateAuthToken = async (payload) => {
  console.log(`creating authToken  ${JSON.stringify(payload)}`);
  payload.iat = _getTimestampInSeconds();
  const token = jwt.sign(payload, config.TOKEN_KEY, {
      algorithm: "HS256",
      expiresIn: `30d`,
  });
  console.log("token : ", token);
  return token;
};
const _getTimestampInSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

module.exports = { verifyToken, generateAuthToken };

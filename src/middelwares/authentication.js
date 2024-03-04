import jwt from "jsonwebtoken";

const AuthenticateMiddleware = (req, res, next) => {
  const headers = req.headers;

  let token = headers.authorization;
  token = token.split(" ");
  console.log(token);
  token = token[1];

  try {
    const userData = jwt.verify(token, process.env.JWT_SIGNATURE);
    console.log(userData, "decode");
    req.user = userData;
  } catch (error) {
    console.log(error, "error");

    return res
      .status(401)
      .json({ message: "Invalid token - please login again" });
  }
  next();
  //   console.log(token, "token");
};

export default AuthenticateMiddleware;

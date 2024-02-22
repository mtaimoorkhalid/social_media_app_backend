import UserModel from "../../model/user/index.js";
import Jwt from "jsonwebtoken";

const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const response = Jwt.sign(
      { email, password },
      "hjdcgjqgdqhkewuidqhsgkxqiewgdJHSGLOEWIDFUILQGHDKkggjkgfjyyuktliugvjhgk"
    );
    if (response.error) {
      return res.json({ error: response.error });
    }
  },
};
export default AuthController;

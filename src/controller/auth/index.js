import UserModel from "../../model/user/index.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// passport.js
// career counselinbg society

const AuthController = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "User Not Found" });
      }
      const result = await bcrypt.compare(password, user.password);
      if (!result) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }

      const id = user.id;
      const response = Jwt.sign(
        { id, email, password },
        process.env.JWT_SIGNATURE,
        {
          expiresIn: "40m",
        }
      );
      res.json({ message: "Login Sucessfull", response });
      if (response.error) {
        return res.json({ error: response.error });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error });
    }
  },
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const saltRounds = 10;
      const hpassword = await bcrypt.hash(password, saltRounds);
      const doUserAlreadyExist = await UserModel.findOne({ where: { email } });
      if (doUserAlreadyExist) {
        return res.json({ message: "This Email Already Exist" });
      }
      const user = await UserModel.create({ name, email, password: hpassword });
      res.json({ message: "User Created", user });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
};
export default AuthController;

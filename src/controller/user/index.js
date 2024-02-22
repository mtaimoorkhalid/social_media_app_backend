import UserModel from "../../model/user/index.js";

const UserController = {
  create: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const doUserAlreadyExist = await UserModel.findOne({ where: { email } });
      if (doUserAlreadyExist) {
        return res.json({ message: "This Email Already Exist" });
      }
      const user = await UserModel.create({ name, email, password });
      res.json({ message: "User Created", user });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  get: async (req, res) => {
    try {
      const user = await UserModel.findAll();
      res.json({ message: "Got All Users", user });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  update: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const prams = req.params;
      const user = await UserModel.findByPk(prams.userId);
      if (!user) {
        return res.json({ message: "No Such User" });
      }
      user.name = name;
      user.email = email;
      user.password = password;
      user.save();
      res.json({ message: "User Got Updated", user });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  delete: async (req, res) => {
    try {
      const param = req.params;
      const user = await UserModel.findByPk(param.userId);
      if (!user) {
        res.status(404).json({ message: "User Not Found" });
      }
      user.destroy();
      res.json({ message: "User Got Deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  deleteAll: async (req, res) => {
    try {
      await UserModel.destroy();
      res.json({ message: "All Users Deleted Sucessfully!" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
};
export default UserController;

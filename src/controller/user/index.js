import CommentModel from "../../model/comment/index.js";
import UserModel from "../../model/user/index.js";
import UserFollwerModel from "../../model/user/userFollowerModel.js";
import PostModel from "../../model/post/index.js";

const UserController = {
  getProfile: (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  getFollower: async (req, res) => {
    try {
      const user = await UserModel.findByPk(req.user.id, {
        include: ["followers"],
      });
      if (!user) {
        return res.json({ message: "No Such User" });
      }

      res.json({ user });
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

  getOne: async (req, res) => {
    try {
      console.log(req.user.id);
      //const prams = req.params;
      const user = await UserModel.findByPk(req.user.id, {
        include: [CommentModel, PostModel, "followers", "followings"],
      });
      if (!user) {
        return res.json({ message: "No Such User" });
      }

      res.json({ user });
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

  follow: async (req, res) => {
    try {
      const { followerId, followingId } = req.body;
      console.log(req.body);
      const data = await UserFollwerModel.create({
        followerId: followerId,
        followingId: followingId,
      });
      console.log(data);
      res.json({ message: "Ho gya" });
    } catch (error) {
      return res.json({ error });
    }
  },

  getFollowerById: async (req, res) => {
    try {
      const params = req.params;
      const user = await UserModel.findByPk(params.id, {
        include: ["follower", "following"],
      });
      if (!user) {
        return res.json({ message: "No Followers" });
      }
      res.json({ message: "Got All Users", user });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
};
export default UserController;

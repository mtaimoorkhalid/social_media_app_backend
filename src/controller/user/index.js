import CommentModel from "../../model/comment/index.js";
import UserModel from "../../model/user/index.js";
import UserFollwerModel from "../../model/user/userFollowerModel.js";
import PostModel from "../../model/post/index.js";

const UserController = {
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await UserModel.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const posts = await PostModel.findAll({ where: { UserId: userId } });
      const followerCount = await UserFollwerModel.count({
        where: { followingId: userId },
      });
      const followingCount = await UserFollwerModel.count({
        where: { followerId: userId },
      });
      const postsCount = await PostModel.count({ where: { UserId: userId } });

      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          followerCount,
          followingCount,
          postsCount,
          posts,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error });
    }
  },
  getFollower: async (req, res) => {
    try {
      const followers = await UserFollwerModel.findAll({
        where: { followingId: req.user.id },
      });
      if (!followers || followers.length === 0) {
        return res.json({ message: "No followers" });
      }
      res.json({ followers });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error });
    }
  },
  getFollowing: async (req, res) => {
    try {
      const followings = await UserFollwerModel.findAll({
        where: { followerId: req.user.id },
        include: [
          {
            model: UserModel,
            as: "following",
            attributes: ["id", "name", "email"],
          },
        ],
      });

      if (!followings || followings.length === 0) {
        return res.json({ message: "No followings" });
      }
      res.json({
        followingId: followings.followingId,
        id: followings.following.id,
        name: followings.following.name,
        email: followings.following.email,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error });
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

  // getOne: async (req, res) => {
  //   try {
  //     console.log(req.user.id);
  //     //const prams = req.params;
  //     const user = await UserModel.findByPk(req.user.id, {
  //       include: [CommentModel, PostModel, "followers", "followings"],
  //     });
  //     if (!user) {
  //       return res.json({ message: "No Such User" });
  //     }

  //     res.json({ user });
  //   } catch (error) {
  //     return res.status(500).json({ message: "Server Error", error: error });
  //   }
  // },
  update: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await UserModel.findByPk(req.user.id);
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
      const user = await UserModel.findByPk(req.user.id);
      if (!user) {
        res.status(404).json({ message: "User Not Found" });
      }
      user.destroy();
      res.json({ message: "User Got Deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  // deleteAll: async (req, res) => {
  //   try {
  //     await UserModel.destroy();
  //     res.json({ message: "All Users Deleted Sucessfully!" });
  //   } catch (error) {
  //     return res.status(500).json({ message: "Server Error", error: error });
  //   }
  // },

  follow: async (req, res) => {
    try {
      const { followingId } = req.body;
      console.log(req.body);
      const data = await UserFollwerModel.create({
        followerId: req.user.id,
        followingId: followingId,
      });
      console.log(data);
      res.json({ message: `You Followed User with ID ${followingId}` });
    } catch (error) {
      return res.json({ error });
    }
  },
  unfollow: async (req, res) => {
    try {
      const { followingId } = req.body;
      console.log(req.body);
      const data = await UserFollwerModel.destroy({
        where: { followerId: req.user.id, followingId: followingId },
      });
      console.log(data);
      res.json({ message: `You Unfollowed User with ID ${followingId}` });
    } catch (error) {
      return res.json({ error });
    }
  },
  removeFollower: async (req, res) => {
    try {
      const { followerId } = req.body;
      console.log(req.body);
      const data = await UserFollwerModel.destroy({
        where: { followerId, followingId: req.user.id },
      });
      console.log(data);
      res.json({ message: `You Removed Follower with ID ${followingId}` });
    } catch (error) {
      return res.json({ error });
    }
  },

  // getFollowerById: async (req, res) => {
  //   try {
  //     const params = req.params;
  //     const user = await UserModel.findByPk(req.user.id, {
  //       include: ["follower", "following"],
  //     });
  //     if (!user) {
  //       return res.json({ message: "No Followers" });
  //     }
  //     res.json({ message: "Got All Users", user });
  //   } catch (error) {
  //     return res.status(500).json({ message: "Server Error", error: error });
  //   }
  // },
};
export default UserController;

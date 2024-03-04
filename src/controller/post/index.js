import PostModel from "../../model/post/index.js";
import UserModel from "../../model/user/index.js";
import UserFollwerModel from "../../model/user/userFollowerModel.js";

const PostController = {
  create: async (req, res) => {
    try {
      const { title, description } = req.body;
      const userId = req.user.id;
      console.log(userId);
      const post = await PostModel.create({
        title,
        description,
        UserId: userId,
      });
      res.json({ message: "Post Created", post });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  get: async (req, res) => {
    try {
      const post = await PostModel.findAll({ include: [UserModel] });
      res.json({ message: "Got All Post", post });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  update: async (req, res) => {
    try {
      const { title, description } = req.body;
      const prams = req.params;
      const post = await PostModel.findByPk(prams.postId);
      if (!post) {
        return res.status(404).json({ message: "Not User Found" });
      }
      post.title = title;
      post.desription = description;
      await post.save();
      res.json({ message: "Posts Updated", post });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  notFound: (req, res) => {
    res.json({ message: "Wrong Path" });
  },
  deleteAll: async (req, res) => {
    try {
      await PostModel.destroy();
      res.json({ message: "All Posts Have been deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  delete: async (req, res) => {
    try {
      const param = req.params;
      const post = await PostModel.findByPk(param.postId);
      if (!post) {
        return res.status(404).json({ message: "No Such Post" });
      }
      await post.destroy();
      res.json({ message: "Post Has been deleted" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  timeline: async (req, res) => {
    try {
      const userId = req.user.id;

      const followingUsers = await UserFollwerModel.findAll({
        where: { followerId: userId },
        attributes: [],
        include: [
          {
            model: UserModel,
            as: "following",
            attributes: ["id"],
          },
        ],
      });

      const followingUserIds = followingUsers.map((user) => user.following.id);

      const timelinePosts = await PostModel.findAll({
        where: { UserId: followingUserIds },
        include: [{ model: UserModel, attributes: ["id", "name", "email"] }],
      });

      res.json({ timelinePosts });
    } catch (error) {
      console.error("Error in timeline method:", error); // Log detailed error message
      return res
        .status(500)
        .json({ message: "An error occurred", error: error.message }); // Send detailed error message in response
    }
  },
};
export default PostController;

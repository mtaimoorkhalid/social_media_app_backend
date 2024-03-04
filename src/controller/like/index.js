import PostModel from "../../model/post/index.js";
import UserModel from "../../model/user/index.js";
import LikeModel from "../../model/like/index.js";

const LikeController = {
  create: async (req, res) => {
    try {
      const { description, PostId } = req.body;
      const userId = req.user.id;
      const like = await LikeModel.create({
        description,
        UserId: userId,
        PostId,
      });
      res.json({ message: "Like Created", like });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  get: async (req, res) => {
    try {
      const like = await LikeModel.findAll({
        include: [UserModel, PostModel],
      });

      res.json({ message: "Got All Like", like });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  getOne: async (req, res) => {
    try {
      const params = req.params;
      const like = await LikeModel.findByPk(params.PostId, {
        include: [UserModel, PostModel],
      });

      res.json({ message: "Got Likes", like });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  update: async (req, res) => {
    try {
      const { description } = req.body;
      const prams = req.params;
      const like = await LikeModel.findByPk(prams.commentId);
      if (!like) {
        return res.status(404).json({ message: "Not User Found" });
      }
      like.description = description;
      await like.save();
      res.json({ message: "Like Update", comment });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },

  deleteAll: async (req, res) => {
    try {
      await LikeModel.destroy({
        where: {},
        truncate: true,
      });
      res.json({ message: "All comments deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  delete: async (req, res) => {
    try {
      const params = req.params;
      const comment = await LikeModel.findByPk(params.commentId);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      } else {
        await comment.destroy();
        res.json({ message: "Comment deleted successfully" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  notFound: (req, res) => {
    res.json({ message: "Wrong API Path" });
  },
};
export default CommentController;

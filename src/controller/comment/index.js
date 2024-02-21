import CommentModel from "../../model/comment/index.js";
import PostModel from "../../model/post/index.js";
import UserModel from "../../model/user/index.js";

const CommentController = {
  create: async (req, res) => {
    try {
      const { description, UserId, PostId } = req.body;
      const comment = await CommentModel.create({
        description,
        UserId,
        PostId,
      });
      res.json({ message: "Comment Created", comment });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  get: async (req, res) => {
    try {
      const comment = await CommentModel.findAll({
        include: [UserModel, PostModel],
      });

      res.json({ message: "Got All Comments", comment });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  getOne: async (req, res) => {
    try {
      const params = req.params;
      const comment = await CommentModel.findByPk(params.PostId, {
        include: [UserModel, PostModel],
      });

      res.json({ message: "Got Comments", comment });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },
  update: async (req, res) => {
    try {
      const { description } = req.body;
      const prams = req.params;
      const comment = await CommentModel.findByPk(prams.commentId);
      if (!comment) {
        res.status(404).json({ message: "Not User Found" });
      }
      comment.description = description;
      await comment.save();
      res.json({ message: "Comments Update", comment });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error: error });
    }
  },

  deleteAll: async (req, res) => {
    try {
      await CommentModel.destroy({
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
      const comment = await CommentModel.findByPk(params.commentId);
      if (!comment) {
        res.status(404).json({ message: "Comment not found" });
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

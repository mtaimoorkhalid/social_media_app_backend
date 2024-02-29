import Joi from "joi";
const CommentValidator = {
  create: (req, res, next) => {
    const schema = Joi.object({
      description: Joi.string().min(3).max(950).required(),
      PostId: Joi.number().required(),
    });
    const response = schema.validate(req.body);
    if (response.error) {
      return res
        .status(400)
        .json({ message: "Bad Data", error: response.error });
    }
    next();
  },
  update: (req, res, next) => {
    const schema = Joi.object({
      description: Joi.string().min(3).max(950).required(),
      UserId: Joi.number().required(),
      PostId: Joi.number().required(),
    });
    const response = schema.validate(req.body);
    if (response.error) {
      return res
        .status(400)
        .json({ message: "Bad Data", error: response.error });
    }
    next();
  },
};

export default CommentValidator;

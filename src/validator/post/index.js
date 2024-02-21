import Joi from "joi";
const PostValidator = {
  create: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(95).required(),
      description: Joi.string().min(3).max(950),
      UserId: Joi.number(),
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
      title: Joi.string().min(3).max(95).required(),
      description: Joi.string().min(3).max(950),
      UserId: Joi.number(),
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

export default PostValidator;

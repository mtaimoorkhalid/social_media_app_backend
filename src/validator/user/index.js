import Joi from "joi";
const UserValidator = {
  login: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    const response = schema.validate(req.body);
    if (response.error) {
      return res
        .status(400)
        .json({ message: "Bad Data", error: response.error });
    }
    next();
  },
  register: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(45).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
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
      name: Joi.string().min(3).max(45).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
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

export default UserValidator;

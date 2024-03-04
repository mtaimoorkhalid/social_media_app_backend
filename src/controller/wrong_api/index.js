const WrongAPIController = {
  wrongApi: async (req, res) => {
    try {
      res.json({
        message: "Wrong API",
      });
    } catch (error) {
      return res.status(500).json({ message: "Server Error", error });
    }
  },
};
export default WrongAPIController;

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    return res.status(201).json({
      message: "User created successfully",
      user: { email },
    });
  } catch (error) {
    return next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: { email },
    });
  } catch (error) {
    return next(error);
  }
};

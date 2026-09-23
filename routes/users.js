import express from "express";

const router = express.Router();

router.get("/me", (req, res) => {
  res.status(200).json({
    user: req.user || { id: "demo-user" },
  });
});

export default router;

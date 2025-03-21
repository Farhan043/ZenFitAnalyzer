const express = require("express");
const router = express.Router();
const bodyProgressController = require("../controllers/bodyProgress.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.config");

router.post("/add", authMiddleware.authUser, upload.single("photo"), bodyProgressController.addBodyProgress);
router.get("/user", authMiddleware.authUser, bodyProgressController.getUserProgress);
router.delete("/:id", authMiddleware.authUser,  bodyProgressController.deleteBodyProgress);
router.get("/progress-by-date", authMiddleware.authUser, bodyProgressController.getProgressByDateRange);



module.exports = router;
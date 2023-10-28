import { Router } from "express";
import multer from "multer";
import user from "../../controller/user.js";
import posting from "../../controller/posting.js";

const router = Router();
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
});

router.post("/", user.loginuser);
router.post("/createuser", upload.single("buffer"), user.createuser);
router.get("/home", posting.home);
// router.get("/home", user.cekToken, posting.home);
router.post("/register", user.createuser);
router.post(
  "/insertpostingan",
  upload.single("buffer"),
  posting.insertpostingan
);
router.post("/updatepostingan/:id", posting.updatepostingan);
router.delete("/deletepostingan/:id", posting.deletepostingan);
router.get("/profil/:id", user.profiluser);
router.get("/uploads/:filename", posting.pictpostingan);
router.get("/profiluser/:filename", user.pictuser);
export default router;

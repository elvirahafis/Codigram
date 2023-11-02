import { Router } from "express";
import multer from "multer";
import user from "../../controller/user.js";
import posting from "../../controller/posting.js";

const router = Router();
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter: async (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|PNG)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(null, true);
  },
});

router.post("/login", user.loginuser);
router.post("/createuser", upload.single("imageuser"), user.createuser);
router.get("/home", user.cekToken, posting.home);
router.get("/listpostinguser/:id", posting.listpostinguser);
router.post(
  "/insertpostingan",
  upload.single("imageuser"),
  posting.insertpostingan
);
router.post("/updatepostingan/:id", posting.updatepostingan);
router.post("/updateuser/:id", user.updateprofiluser);
router.delete("/deletepostingan/:id", posting.deletepostingan);
router.get("/profil/:id", user.profiluser);
router.get("/uploads/:filename", posting.pictpostingan);
router.get("/profiluser/:filename", user.pictuser);
router.get("/listuser", user.listprofil);
router.get("/detail/:id", posting.detailprofil);
router.get("/searchpos/:id", posting.searchpos);
router.get("/detailposting/:id", posting.detailposting);
router.delete("/list", posting.userlist);
export default router;

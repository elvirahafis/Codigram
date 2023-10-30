import { errorhandling } from "../helper/errorhandling.js";
import models from "../model2/init-models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import path from "path";

const loginuser = async (req, res) => {
  try {
    const user = await models.users.findOne({
      where: { username: req.body.usr },
    });
    if (user) {
      const password_valid = await bcrypt.compare(req.body.pswd, user.password);
      if (password_valid) {
        const token = jwt.sign(
          JSON.parse(JSON.stringify(user)),
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        res.send(errorhandling(token, 200, "sukses"));
      } else {
        res.send(errorhandling(400, "Password Incorrect"));
      }
    } else {
      res.send(errorhandling(400, "User does not exist"));
    }
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
const createuser = async (req, res) => {
  try {
    const { usr, pswd } = req.body;
    console.log(req.body.usr, req.body.pswd, req.file.imageuser);
    const salt = bcrypt.genSaltSync(10);
    const passhash = bcrypt.hashSync(pswd, salt);
    const configsufix = Math.round(Math.random() * 1e9);

    await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toFile(`./uploads/${configsufix}${req.file.originalname}`);
    const t = req.file.mimetype;
    const imageG = `${configsufix}${req.file.originalname}`;
    console.log(usr, pswd, imageG, t, "sssd");
    const result = await models.users.create(
      {
        username: usr,
        password: passhash,
        image: imageG,
        path: t,
      },
      { returning: true }
    );
    res.send(errorhandling(result, 200, "sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

const profiluser = async (req, res) => {
  try {
    const result = await models.users.findOne({ where: { id: req.params.id } });
    res.send(errorhandling(result, 200, "Sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
const pictuser = async (req, res) => {
  try {
    const { filename } = req.params;
    const result = await models.users.findOne({
      where: { image: filename },
    });
    console.log(result.path, "ee");
    if (!result[0]) {
      console.log(result.description, "123");
      const dirname = path.resolve();
      console.log(dirname, "ww");
      const fullfilepath = path.join(dirname, `uploads/` + filename);
      return res.type(result.path).sendFile(fullfilepath);
    } else {
      return Promise.reject(new Error("Image does not exist"));
    }
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
const cekToken = async (req, res, next) => {
  try {
    const token = req.headers.access_token;
    if (token) {
      if (jwt.verify(token, process.env.SECRET_KEY)) {
        next();
      }
    } else {
      res.send(errorhandling(200, "Tidak Terautorisasi"));
    }
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
const listprofil = async (req, res) => {
  try {
    const result = await models.users.findAll();
    res.send(errorhandling(result, 200, "Sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
const updateprofiluser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const passhash = bcrypt.hashSync(req.body.pswd, salt);
    await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toFile(`./uploads/${configsufix}${req.file.originalname}`);

    const t = req.file.mimetype;
    const imageG = `${configsufix}${req.file.originalname}`;
    const result = await models.users.update(
      { username: req.body.usr, password: passhash, image: imageG, path: t },
      { where: { id: req.params.id }, returning: true }
    );
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
export default {
  loginuser,
  createuser,
  cekToken,
  profiluser,
  pictuser,
  listprofil,
  updateprofiluser,
};

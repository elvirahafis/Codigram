import { errorhandling } from "../helper/errorhandling.js";
import models from "../model2/init-models.js";
import sharp from "sharp";
import path from "path";
import { sequelize } from "../model2/init-models.js";

const home = async (req, res) => {
  try {
    const query = `select * from postinghome`;
    const result = await sequelize.query(query);
    res.send(errorhandling(result[0], 200, "Sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

const profil = async (req, res) => {
  try {
    const result = await models.postingan.findAll({
      where: { user_id: req.params.id },
    });
    res.send(errorhandling(result, 200, "Sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
const insertpostingan = async (req, res) => {
  try {
    const { description, user_id } = req.body;
    const configsufix = Math.round(Math.random() * 1e9);
    // console.log(description, user_id, req.file.buffer);
    await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toFile(`./uploads/${configsufix}${req.file.originalname}`);
    const tr = req.file.mimetype;
    const imageG = `${configsufix}${req.file.originalname}`;
    const result = await models.postingan.create({
      description: description,
      image: imageG,
      user_id: user_id,
      path: tr,
    });
    res.send(errorhandling(result, 200, "Sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
const uploadimage = async (req, res) => {
  try {
    const { buffer } = req.file;
    const configsufix = Math.round(Math.random() * 1e9);
    await sharp(buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toFile(`./uploads/${configsufix}${req.file.originalname}`);
    res.status(201).send("Image uploaded succesfully");
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};

const deletepostingan = async (req, res) => {
  try {
    const result = await models.postingan.destroy({
      where: { id: req.params.id },
    });
    res.send(errorhandling(result, 200, "Sukses"));
  } catch (error) {}
};
const pictpostingan = async (req, res) => {
  try {
    const { filename } = req.params;
    const result = await models.postingan.findOne({
      where: { image: filename },
    });
    console.log(result.image, "ee");
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
const updatepostingan = async (req, res) => {
  try {
    console.log(req.body.description);
    const result = await models.postingan.update(
      { description: req.body.description, updatedat: new Date() },
      { where: { id: req.params.id }, returning: true }
    );
    res.send(errorhandling(result, 200, "Sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
const listpostinguser = async (req, res) => {
  try {
    console.log(req.params.id);
    const query = `SELECT id,description, image,user_id,path, DATE(postingan.updatedat) as createdat 
    FROM postingan WHERE postingan.user_id= ${req.params.id} ORDER BY  postingan.createdat DESC`;
    const result = await sequelize.query(query);
    res.send(errorhandling(result[0], 200, "Sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
const detailprofil = async (req, res) => {
  try {
    const result = await models.postingan.findOne({
      where: { id: req.params.id },
    });
    res.send(errorhandling(result, 200, "Sukses"));
  } catch (error) {
    res.send(errorhandling(400, error.message));
  }
};
export default {
  home,
  profil,
  insertpostingan,
  uploadimage,
  deletepostingan,
  updatepostingan,
  pictpostingan,
  listpostinguser,
  detailprofil,
};

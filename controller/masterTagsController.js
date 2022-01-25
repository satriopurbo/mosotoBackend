const masterTags = require("../model/masterTagsModel");
const poolTags = require("../model/poolTagsModel");
const sq = require("../config/connection");

class Controller {
  static register(req, res) {
    const { namamasterTags } = req.body;
    masterTags
      .findAll({
        where: {
          namamasterTags: namamasterTags,
        },
      })
      .then((hasil) => {
        if (hasil.length) {
          res.status(200).json({ status: 200, message: "data sudah ada" });
        } else {
          masterTags.create({ namamasterTags }).then((data) => {
            res.status(200).json({ status: 200, message: "sukses" });
          });
        }
      });
  }

  static update(req, res) {
    const { id, namamasterTags } = req.body;
    masterTags
      .findAll({
        where: {
          namamasterTags: namamasterTags,
        },
      })
      .then((hasil) => {
        if (hasil.length) {
          res.status(200).json({ status: 200, message: "data sudah ada" });
        } else {
          masterTags
            .update(
              { namamasterTags },
              {
                where: {
                  id: id,
                },
              }
            )
            .then((data) => {
              res.status(200).json({ status: 200, message: "sukses" });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ status: 200, message: "gagal", data: err });
      });
  }

  static list(req, res) {
    masterTags
      .findAll({})
      .then((data) => {
        res.status(200).json({ status: 200, message: "sukses", data });
      })
      .catch((err) => {
        res.status(500).json({ status: 200, message: "gagal", data: err });
      });
  }

  static detailsById(req, res) {
    const { id } = req.params;
    masterTags
      .findAll({
        where: {
          id: id,
        },
      })
      .then((data) => {
        res.status(200).json({ status: 200, message: "sukses", data });
      })
      .catch((err) => {
        res.status(500).json({ status: 200, message: "gagal", data: err });
      });
  }

  static async listByKontenId(req, res) {
    const { id } = req.params;
    await sq.query(
        `select * from "poolTags" pt join "masterTags" mt on mt.id = pt."masterTagId" where pt."kontenId" = '${id}'`
      )
      .then((data) => {
        //   console.log(data)
        res.status(200).json({ status: 200, message: "sukses", data: data[0] });
      })
      .catch((err) => {
        res.status(500).json({ status: 200, message: "gagal", data: err });
      });
  }

  static delete(req, res) {
    const { id } = req.body;
    masterTags
      .destroy({
        where: {
          id: id,
        },
      })
      .then((data) => {
        res.status(200).json({ status: 200, message: "sukses" });
      })
      .catch((err) => {
        res.status(500).json({ status: 200, message: "gagal", data: err });
      });
  }
}

module.exports = Controller;

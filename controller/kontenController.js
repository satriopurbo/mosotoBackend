const konten = require("../model/kontenModel");
const subKOnten = require("../model/kontenModel");
const poolTags = require("../model/poolTagsModel");
const masterTags = require("../model/masterTagsModel")
const sq = require("../config/connection");
const subKonten = require("../model/subKontenModel");

class Controller {
  static register(req, res) {
    const { judulKonten, typeKonten, modelKonten, bulkTagString } = req.body;
    let bulkTag = JSON.parse(bulkTagString);
    let f1 = "";
    if (req.files) {
      if (req.files.file1) {
        f1 = req.files.file1[0].filename;
      }
    }

    konten
      .findAll({
        where: {
          judulKonten: judulKonten,
        },
      })
      .then((hasil) => {
        if (hasil.length) {
          res.status(200).json({ status: 200, message: "judul sudah ada" });
        } else {
          konten
            .create({
              judulKonten,
              typeKonten,
              modelKonten,
              kreatorId: req.dataUsers.id,
              gambarKonten: f1,
            })
            .then((hasil2) => {
              console.log(hasil2.id);
              for (let i = 0; i < bulkTag.length; i++) {
                bulkTag[i]["kontenId"] = hasil2.id;
              }
              poolTags
                .bulkCreate(bulkTag)
                .then((hasil3) => {
                  res
                    .status(200)
                    .json({ status: 200, message: "sukses", data: hasil2 });
                })
                .catch((err) => {
                  res
                    .status(500)
                    .json({ status: 500, message: "gagal", data: err });
                });
            });
        }
      });
  }

  static list(req, res) {
    konten
      .findAll({})
      .then((data) => {
        res.status(200).json({ status: 200, message: "sukses", data: data });
      })
      .catch((err) => {
        res.status(500).json({ status: 200, message: "gagal", data: err });
      });
  }

  static async update(req, res) {
    const { kontenId, judulKonten, typeKonten, modelKonten } = req.body;

    console.log(req.body);
    if (req.files) {
      if (req.files.file1) {
        await sq.query(
          `update "konten" SET "gambarKonten" ='${req.files.file1[0].filename}' where id = ${kontenId}`
        );
      }
    }
    konten
      .update(
        { judulKonten, typeKonten, modelKonten },
        { where: { id: kontenId } }
      )
      .then((hasil) => {
        res
          .status(200)
          .json({ status: 200, message: "sukses", data: { id: kontenId } });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, message: "gagal", data: err });
      });
  }

  static listByJudul(req, res) {
    const { judul } = req.body;
    konten
      .findAll({ where: { judulKonten: judul } })
      .then((data) => {
        res.status(200).json({ status: 200, message: "sukses", data: data });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, message: "gagal", data: err });
      });
  }

  static async listByKategori(req, res) {
    const { typeKonten } = req.body;
    konten
      .findAll({ where: { typeKonten: typeKonten } })
      .then((data) => {
        res.status(200).json({ status: 200, message: "sukses", data: data });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, message: "gagal", data: err });
      });
  }

  static async listByTags(req, res) {
    const { tags } = req.body;
    console.log(req.body)
    await sq
      .query(
        `select * from "masterTags" mt join "poolTags" pt on pt."masterTagId" = mt."id" join "konten" kt on kt."id" = pt."kontenId" where mt."namamasterTags"='${tags}' `
      )
      .then((data) => {
        res.status(200).json({ status: 200, message: "sukses", data: data[0] });
      })
      .catch((err) => {
        res.status(500).json({ status: 500, message: "gagal", data: err });
      });
  }
}

module.exports = Controller;

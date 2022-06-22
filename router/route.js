
var express = require("express");
var router = express.Router();

const { check, validationResult } = require("express-validator");

const db = require("./../db");

router.get("/", (req, res, next) => {
  db.getAllNotice((rows) => {
    res.render("notice", { rows: rows });
  });
});

//페이지연결
router.get("/write", (req, res, next) => {
  res.render("write");
});

router.post(
  "/store",
  check("content").isLength({ min: 1, max: 500 }),
  function (req, res, next) {
    let errs = validationResult(req);
    console.log(errs); //에러출력
    if (errs["errors"].length > 0) {
      //화면에 에러출력
      res.render("write", { errs: errs["errors"] });
    } else {
      let param = JSON.parse(JSON.stringify(req.body));
      let title = param['title'];
      let content = param['content'];
      db.insertNotice(title, content, () => {
        res.redirect("/");
      });
    }
  }
);

router.get("/updatenoti", (req, res) => {
  let id = req.query.id;

  db.getNoticeById(id, (row) => {
    if (typeof id === "undefined" || row.length <= 0) {
      res.status(404).json({ error: "undefined" });
    } else {
      res.render("updatenoti", { row: row[0] });
    }
  });
});

router.post(
  "/updatenoti",
  [check("content").isLength({ min: 1, max: 300 })],
  (req, res) => {
    let errs = validationResult(req);
    let param = JSON.parse(JSON.stringify(req.body));
    let id = param['id'];
    let title = param['title'];
    let content = param['content'];

    if (errs["errors"].length > 0) {
      db.getNoticeById(id, (row) => {
        res.render("updatenoti", { row: row[0], errs:errs["errors"] });
      });
    } else {
      db.updateNoticeById(id, title, content, () => {
        res.redirect("/");
      });
    }
  }
);

router.get("/deletenoti", (req, res) => {
  let id = req.query.id;
  db.deleteNoticeById(id, () => {
    res.redirect("/");
  });
});

module.exports = router;

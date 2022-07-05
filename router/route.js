const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const db = require("../db");
router.use(expressLayouts);


//route, routing
router.get("/", (req, res) => {
  res.render("main");
});

router.get("/info", (req, res) => {
  res.render("info");
});

router.get("/noticedeta", (req, res) => {
  res.render("notice_deta");
});

router.get("/join", (req, res) => {
  res.render("join");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/write", (req, res) => {
  res.render("write");
});

router.get("/notice", (req, res, next) => {
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
  check("content").isLength({ min: 1, max: 3000 }),
  function (req, res, next) {
    let errs = validationResult(req);
    console.log(errs); //에러출력
    if (errs["errors"].length > 0) {
      //화면에 에러출력
      res.render("write", { errs: errs["errors"] });
    } else {
      let param = JSON.parse(JSON.stringify(req.body));
      let title = param["title"];
      let content = param["content"];
      db.insertNotice(title, content, () => {
        res.redirect("/notice");
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
  [check("content").isLength({ min: 1, max: 3000 })],
  (req, res) => {
    let errs = validationResult(req);
    let param = JSON.parse(JSON.stringify(req.body));
    let id = param["id"];
    let title = param["title"];
    let content = param["content"];

    if (errs["errors"].length > 0) {
      db.getNoticeById(id, (row) => {
        res.render("updatenoti", { row: row[0], errs: errs["errors"] });
      });
    } else {
      db.updateNoticeById(id, title, content, () => {
        res.redirect("/notice");
      });
    }
  }
);

router.get("/notice_deta", function (req, res) {
  let id = req.query.id;

  db.getpageByid(id, (row) => {
    if (typeof id === "undefined" || row.length <= 0) {
      res.status(404).json({ error: "undefind notice" });
    } else {
      res.render("notice_deta", { row: row[0] });
    }
  });
});

router.get("/deletenoti", (req, res) => {
  let id = req.query.id;
  db.deleteNoticeById(id, () => {
    res.redirect("/notice");
  });
});

module.exports = router;

const express = require("express");
const app = express();
var expressLayouts = require("express-ejs-layouts");
var cookieParser = require('cookie-parser');
var logger = require("morgan");

var path = require("path");
const http = require("http");

const routers = require("./router/route.js");

setInterval(function () {
  http.get("https://seomuntest23.herokuapp.com/");
}, 600000);

app.set("views", path.join(__dirname, "views")); //views라는 폴더안에 ejs들을 불러올거다. + views안에 ejs파일들을 만들어주면됨.
app.set("view engine", "ejs");
app.set("layout", "layout");
app.set("layout extractScripts", true);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public"))); //public이라는 폴더에서 css와 img를 다 받아올것이라는 의미 + public폴더 안에 css폴더와 img폴더를 넣어주면됨.
app.use("/", routers);

module.exports = app;

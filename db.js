const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  port: 3306,
  database: "seomun",
  dateStrings: "date", //날짜 시간 출력
});

//리스트 전체를 불러오는 방법
function getAllNotice(callback) {
  connection.query(
    "select * from notice ORDER BY id DESC",
    (err, rows, fields) => {
      if (err) throw err;
      callback(rows);
    }
  );
}

//리스트에 새로운 내용을 추가하는 함수
function insertNotice(title, content, callback) {
  connection.query(
    `INSERT INTO notice(title, date, content) VALUES
    ('${title}',NOW(),'${content}')`,
    (err, result) => {
      if (err) throw err;
      callback();
    }
  );
}

//리스트 중 id값이 일치하는 row만 불러오는 함수
function getNoticeById(id, callback) {
  connection.query(
    `select * from notice WHERE ID = ${id}`,
    (err, row, fields) => {
      if (err) throw err;
      callback(row);
    }
  );
}

//리스트를 수정하고 싶을때 id값이 일치하는 부분을 수정하는 함수
function updateNoticeById(id, title, content, callback) {
  connection.query(
    `UPDATE notice SET title ='${title}', content='${content}' , date=NOW() WHERE id='${id}'`,
    (err, result) => {
      if (err) throw err;
      callback();
    }
  );
}

//리스트 중 id값이 일치하는 부분을 삭제하는 함수
function deleteNoticeById(id, callback) {
  connection.query(`DELETE from notice WHERE id =${id}`, (err, result) => {
    if (err) throw err;
    callback();
  });
}

//id값이 일치한 값의 모든 값을 가져오는 함수
function getpageByid(id, callback) {
  connection.query(
    `SELECT * FROM notice WHERE id = '${id}'`,
    (err, row, fields) => {
      if (err) throw err;
      callback(row);
    }
  );
}

module.exports = {
  getAllNotice,
  insertNotice,
  getNoticeById,
  deleteNoticeById,
  updateNoticeById,
};

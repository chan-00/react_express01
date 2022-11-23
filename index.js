const express = require("express"); //웹서버 생성
const mysql = require("mysql"); // 데이터베이스
const bodyParser = require("body-parser"); // 요청정보 처리
const cors = require("cors"); // 교차 출처 리소스 공유(Cross-Origin Resource Sharing, CORS)

const app = express(); // 익스프레스 설정
const PORT = process.env.port || 8000; // 포트번호 설정 포트번호는 0부터 16비트

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // 객체 형식 처리

let corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키, ...등) 접근
};

app.use(cors(corsOptions)); // 미들웨어 설정 작업

const db = mysql.createPool({
  // mysql 연결 설정
  host: "localhost",
  // port번호 생략하면 기본값 3306 지정되어있음
  port: 3307,
  user: "root",
  password: "1234",
  database: "reactmysqlex",
  // 여러 쿼리를 ';'를 기준으로 한번에 보낼 수 있게한다.
  multipleStatements: true,
});

//login 백엔드 코드
app.post("/login", (req, res) => {
  let id = req.body.id;
  let pw = req.body.pw;

  const sqlQuery = "select count(*) as 'cnt' from member where userID = ? and userPW = ?;";
  db.query(sqlQuery, [id, pw], (err, result) => {
    if(err) console.log(err.message);
    res.send(result);
  })
})

//signup 백엔드 코드
app.post("/signup", (req, res) => {
  let id = req.body.id;
  let pw = req.body.pw;
  let email = req.body.email;

  const sqlQuery = "insert into member(userID, userPW, userEmail) values(?, ?, ?);";
  db.query(sqlQuery, [id, pw, email], (err, result) => {
    if(err) console.log(err.message);
    res.send(result);
  })
})

//list 백엔드 코드
app.get("/list", (req, res) => {
  const sqlQuery =
  "SELECT BOARD_NUM, BOARD_WRITER, BOARD_TITLE, BOARD_CONTENT, DATE_FORMAT(BOARD_DATE, '%Y-%m-%d') AS BOARD_DATE FROM BOARD_TBL;";

  db.query(sqlQuery, (err, result) => {
    // select문 결과를 클라이언트에게 반환
    res.send(result);
  });
})

//write 백엔드 코드
app.post("/write", (req, res) => {
  const writer = req.body.writer;
  const  title = req.body.title;
  const content = req.body.content;

  const sqlQuery = "insert into board_tbl(board_writer, board_title, board_content, board_date) values(?, ?, ?, now());";
  db.query(sqlQuery, [writer, title, content], (err, result) => {
    if(err) console.log(err);
    console.log(result);
    res.send(result);
  });
});

//detail 백엔드 코드
app.post("/detail", (req, res) => {
  const boardNum = req.body.num;

  const sqlQuery = "select * from board_tbl where board_num = ?;";
  db.query(sqlQuery, [boardNum], (err, result) => {
    if(err) console.log(err.message);
    console.log(result);
    res.send(result);
  })
})

//update 백엔드 코드
app.post("/update", (req, res) => {
  const num = req.body.num;
  const title = req.body.title;
  const content = req.body.content;

  const sqlQuery = "update board_tbl set board_title = ?, board_content = ? where board_num = ?;";
  db.query(sqlQuery, [title, content, num], (err, result) => {
    if(err) console.log(err.message);
    res.send(result);
  })
})

//delete 백엔드 코드
app.post("/delete", (req, res) => {
  const num = req.body.num;

  const sqlQuery = "delete from board_tbl where board_num = ?; SET @cnt = 0; UPDATE board_tbl SET board_num = @cnt:= @cnt + 1; ALTER TABLE board_tbl AUTO_INCREMENT = 1;";
  db.query(sqlQuery, [num], (err, result) => {
    if(err) console.log(err.message);
    res.send(result);
  });
})

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});
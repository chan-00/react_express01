//css 포함
import "./css/App.css";
//사용자 정의 component 모음
import BoardMain from "./component/BoardMain";
import Header from "./component/Header";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import WriteBoard from "./component/WriteBoard";
import BoardDetail from "./component/BoardDetail";
//react hook 포함
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

function App() {
  //main 페이지에서의 상태 관리
  const [boardlist, setBoardlist] = useState({ boardList: []});
  const [userID, setUserID] = useState(window.sessionStorage.id ? window.sessionStorage.id : "");
  const [boardNum, setBoardNum] = useState(0);
  const [article, setArticle] = useState({});

  const getList = () => {
    axios.get("http://localhost:8000/list", {}).then((res) => {
        const { data } = res;
        
        setBoardlist({
            boardList: data,
        });
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
  };

  return (
    <div className="App">
      { <Router>
        <Header setID={setUserID}/>
        <Routes>
          <Route path="/" element={
          <BoardMain setBoardlist={setBoardlist} 
                     boardlist={boardlist} getList={getList} setArticle={setArticle}>
          </BoardMain>}></Route>
          <Route path="/login" element={<Login setID={setUserID}></Login>}></Route>
          <Route path="/signup" element={<SignUp setID={setUserID}></SignUp>}></Route>
          <Route path="/writeBoard" element={
            <WriteBoard getList={getList}></WriteBoard>}
          ></Route>
          <Route path="/detail" element={
            <BoardDetail article={article} setArticle={setArticle}
            getList={getList}></BoardDetail>}
          ></Route>
        </Routes>
      </Router> }
    </div>
  );
}

export default App;

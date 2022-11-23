import axios from "axios";
import { useEffect, useState } from "react";
import BoardArticle from "./BoardArticle";
import {Link, useNavigate} from "react-router-dom";

function BoardMain({ setBoardlist, boardlist, getList, setArticle }) {
    const navigate = useNavigate();

    const handleDetail = (e) => {
        axios.post("http://localhost:8000/detail", {num: e.target.id}).then((res) => {
            const { data } = res;
            setArticle(data[0]);
            navigate("/detail");
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getList();
    }, []);

    if(boardlist.boardList.length === 0) {
        return (
            <div>
                게시글 데이터가 없습니다.
                <br></br>
                {window.sessionStorage.id
                ? <Link to="/writeBoard"><button>글 작성</button></Link>
                : null}
            </div>
        )
    }
    else {
        return (
            <div>
                {boardlist.boardList.map((article) => {
                    return (
                        <BoardArticle
                        article={article}
                        key={article.BOARD_NUM}
                        handleDetail={handleDetail}
                        ></BoardArticle>
                    );
                })}
                {window.sessionStorage.id
                ? <Link to="/writeBoard"><button>글 작성</button></Link>
                : null}
            </div>
        );
    }
}

export default BoardMain;
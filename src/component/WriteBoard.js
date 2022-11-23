import { useRef } from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

import "../css/WriteBoard.css";

function WriteBoard({getList}) {
    const titleRef = useRef();
    const contentRef = useRef();

    const navigate = useNavigate();

    const handleWrite = () => {
        if (titleRef.current.value === "" || titleRef.current.value === undefined) {
            alert("제목을 입력하세요!!!");
            titleRef.current.focus();
            return false;
        }

        axios.post("http://localhost:8000/write", {
            writer: window.sessionStorage.id,
            title: titleRef.current.value,
            content: contentRef.current.value,
        }).then((res) => {
            if (res.data.affectedRows === 1) {
                alert("글 작성 성공!!!");
                getList();
            } 
            else {
                alert("글 작성 실패!!!");
                titleRef.current.value = "";
                contentRef.current.value = "";
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <form>
            title : <input
                type="text"
                name="title"
                size="20"
                defaultValue=""
                ref={titleRef}
                placeholder="제목을 입력하세요"
            ></input>
            <br></br>
            Writer: {window.sessionStorage.id}
            <br></br>
            Content : <br></br>
            <textarea
                type="text"
                name="content"
                size="100"
                defaultValue=""
                ref={contentRef}
                placeholder="내용을 입력하세요"
            ></textarea>
            <br></br>
            <Link to="/"><button onClick={handleWrite}>save</button></Link>
        </form>
    )
}

export default WriteBoard;
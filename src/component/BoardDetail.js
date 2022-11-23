import {useRef} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const BoardDetail = ({article, setArticle, getList}) => {
    const titleRef = useRef();
    const contentRef = useRef();

    console.log(article);

    const handleUpdate = () => {
        axios.post("http://localhost:8000/update", {
            num: article.BOARD_NUM,
            title: titleRef.current.value,
            content: contentRef.current.value,
        }).then((res) => {
            if(res.data.affectedRows === 1) {
                alert("수정되었습니다!");
                getList();
            } else
                alert("글 작성 실패!!!");
        }).catch((err) => {
            console.log(err);
            alert("수정이 되지 않았습니다.");
        });
    }

    const handleDelete = () => {
        axios.post("http://localhost:8000/delete", {num: article.BOARD_NUM})
        .then((res) => {
            alert("삭제되었습니다!");
            getList();
        }).catch((err) => {
            alert("삭제가 되지 않았습니다.");
            console.log(err);
        });
    }

    if(article.BOARD_WRITER === window.sessionStorage.id) {
        return (
            <form>
                title : <input
                    type="text"
                    name="title"
                    size="20"
                    defaultValue={article.BOARD_TITLE}
                    ref={titleRef}
                ></input>
                <br></br>
                Writer: {article.BOARD_WRITER}
                <br></br>
                Content : <br></br>
                <textarea
                    type="text"
                    name="content"
                    size="100"
                    defaultValue={article.BOARD_CONTENT}
                    ref={contentRef}
                ></textarea>
                <br></br>
                <Link to="/"><button onClick={handleUpdate}>수정하기</button></Link>
                <br></br>
                <Link to="/"><button onClick={handleDelete}>삭제하기</button></Link>
            </form>
        )
    } else {
        return (
            <form>
                title : <input
                    type="text"
                    name="title"
                    size="20"
                    defaultValue={article.BOARD_TITLE}
                    readOnly
                ></input>
                <br></br>
                Writer: {article.BOARD_WRITER}
                <br></br>
                Content : <br></br>
                <textarea
                    type="text"
                    name="content"
                    size="100"
                    defaultValue={article.BOARD_CONTENT}
                    readOnly
                ></textarea>
            </form>
        )
    }
    
}

export default BoardDetail;
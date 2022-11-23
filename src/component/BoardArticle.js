// css 포함
import "../css/BoardArticle.css";

function BoardArticle({ article, handleDetail }) {
    return (
        <div id="articleDiv">
            <span>{article.BOARD_NUM}</span>
            <a href="#" onClick={handleDetail}><span id={article.BOARD_NUM}>{article.BOARD_TITLE}</span></a>
            <span>{article.BOARD_WRITER}</span>
            <span>{article.BOARD_DATE}</span>
        </div>
    );
}

export default BoardArticle;
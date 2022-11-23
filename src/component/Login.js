import {useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Login({ setID }) {
    const idRef = useRef();
    const pwRef = useRef();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (idRef.current.value === "" || idRef.current.value === undefined) {
            alert("아이디를 입력하세요!!!");
            idRef.current.focus();
            return false;
        }
        if (pwRef.current.value === "" || pwRef.current.value === undefined) {
            alert("패스워드를 입력하세요!!!");
            pwRef.current.focus();
            return false;
        }

        axios.post("http://localhost:8000/login", {
            id: idRef.current.value,
            pw: pwRef.current.value,
        }).then((res) => {
            if (res.data[0].cnt === 1) {
                alert("로그인 성공!!!");
                window.sessionStorage.setItem("id", idRef.current.value);
                setID(idRef.current.value);
                navigate("/");
            } 
            else {
                alert("로그인 실패!!!");
                idRef.current.value = "";
                pwRef.current.value = "";
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
    <form>
        <div>
            <input
                type="text"
                name="id"
                size="20"
                defaultValue=""
                ref={idRef}
                placeholder="아이디를 입력하세요"
            ></input>
        </div>
        <div>
            <input
                type="password"
                name="pw"
                size="20"
                defaultValue=""
                ref={pwRef}
                placeholder="비밀번호를 입력하세요"
            ></input>
        </div>
        <div>
            <input
                type="button"
                value="로그인"
                onClick={handleLogin}
            ></input>
        </div>
    </form>
    )
}

export default Login;
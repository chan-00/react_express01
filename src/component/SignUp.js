import {useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function SignUp({ setID }) {
    const idRef = useRef();
    const pwRef = useRef();
    const emailRef = useRef();
    const navigate = useNavigate();

    const handleSignUp = () => {
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
        if (emailRef.current.value === "" || emailRef.current.value === undefined) {
            alert("이메일을 입력하세요!!!");
            emailRef.current.focus();
            return false;
        }

        axios.post("http://localhost:8000/signup", {
            id: idRef.current.value,
            pw: pwRef.current.value,
            email: emailRef.current.value,
        }).then((res) => {
            if (res.data.affectedRows === 1) {
                alert("회원가입 성공!!!");
                window.sessionStorage.setItem("id", idRef.current.value);
                setID(idRef.current.value);
                navigate("/");
            } 
            else {
                alert("회원가입 실패!!!");
                idRef.current.value = "";
                pwRef.current.value = "";
                emailRef.current.value = "";
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
                type="text"
                name="email"
                size="20"
                defaultValue=""
                ref={emailRef}
                placeholder="이메일을 입력하세요"
            ></input>
        </div>
        <div>
            <input
                type="button"
                value="회원가입"
                onClick={handleSignUp}
            ></input>
        </div>
    </form>
    )
}

export default SignUp;
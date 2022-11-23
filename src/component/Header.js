import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header({ setID }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        window.sessionStorage.clear();
        setID("");
        navigate("/");
        alert("logout 되었습니다.");
    }

    return (
        <div>
            <Link to="/"><h2>React Mysql Ex Page</h2></Link>
            {window.sessionStorage.id 
            ? <div>
                <h3>현재 로그인된 계정 : {window.sessionStorage.id}</h3>
                <button onClick={handleLogout}>Logout</button>
              </div>
            : <div>
                <Link to="/login"><button>login</button></Link>
                <Link to="/signup"><button>SignUp</button></Link>
              </div>}
        </div>
    )
}

export default Header;

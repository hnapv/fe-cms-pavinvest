import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import "./navbar.css";
const NavBar = () => {
  const user = useSelector(( state) => state.auth.login.currentUser)
  console.log(user)
  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-home"> Home </Link>
      {user? (
        <>
        <p className="navbar-user">Hi, <span> {user.fullname}  </span> </p>
        <Link to="/logout" className="navbar-logout"> Log out</Link>
        </>
      ) : (    
        <>
      <Link to="/login" className="navbar-login"> Login </Link>
      <Link to="/register" className="navbar-register"> Register</Link>
      </>
)}
    </nav>
  );
};

export default NavBar;
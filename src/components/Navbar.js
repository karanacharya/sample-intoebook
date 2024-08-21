import React,{useEffect} from "react";
import { Link, useLocation  } from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
  }, [location]);

  const handlelogout = ()=>{
    localStorage.removeItem("token");
    console.log("handle logout clicked");
      navigate('/login');
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="#">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className={`nav-item ${location.pathname==='/'? "active":""}`}>
              <Link
                 className="nav-link"
                to="/"
              >
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li  className={`nav-item ${location.pathname==='/about'? "active":""}`}>
              <Link
                className="nav-link"
                to="/about"
              >
                About <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>


       { !localStorage.getItem("token")?<form>
          <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary  mx-1" to="/signup" role="button">Signup</Link>
         </form>:<button className="btn btn-primary" onClick={handlelogout}>Logout</button>
         }
          
          
                   
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

import { useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../context/notes/alertContext";

const Signup = () => {
   const context = useContext(AlertContext);
    const {showAlert} =  context;
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  let Navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    console.log("signup is clicked");


    //api call to create a new user
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      Navigate("/login");
      showAlert("Account created successfully","success")
    } else {
      showAlert(`${json.error}`,"danger");
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-5 ">
        <div className="row justify-content-center bg-transparent text-light ">
          <div className="col-md-5 ">
            <form onSubmit={signup}>
              <h1 className="text-center text-warning">Sign up</h1>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="name"
                  required
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  required
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  required
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <input
                  type="password"
                  name="cpassword"
                  className="form-control"
                  id="cpassword"
                  required
                  onChange={onChange}
                />
              </div>

              {/* <!-- Sign Up button --> */}
              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>

              {/* <!-- Additional links --> */}
              <div className="mt-3">
                <p>
                  Already have an account? <a href="/login">Log in</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

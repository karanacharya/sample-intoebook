import React ,{useContext, useState , useEffect}from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import AlertContext from "../context/notes/alertContext";

const Login = (props) =>{
   const context =useContext(AlertContext);
    const { showAlert} = context;
    // useEffect(() => {
    //   showAlert("Login alert","success");  
    // }, []);
    
   const [credentials, setCredentials] = useState({email:"", password:""});
   
   let Navigate = useNavigate();
  

   const handleSubmit= async(e)=>{
     e.preventDefault();

      //Fetching an api from backend to login a user
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email:credentials.email, password:credentials.password})    
      }); 

      
      const json = await response.json();
      console.log(json);
     if(json.success){
        localStorage.setItem("token", json.authtoken);
        Navigate('/')
        showAlert("Logged in successfully","success")
     }
     else{
       showAlert("Invalid username or password","danger")
     }
   }
          
  //  const redirect =(json)=>{
  //    if(json.success){
  //      Navigate('/')
  //    }
  //  }



    const onChange =(e)=>{
       setCredentials({...credentials , [e.target.name]: e.target.value})
    }
  return (
    <div className=" container my-5  w-25 bg-transparent rounded text-light">
      <form className=" w-100 my-2" onSubmit={handleSubmit}>
        <div className="form-group">

        <h1 className="text-center text-warning">Login</h1>
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <small id="emailHelp" className="form-text text-light">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            value={credentials.password}
          onChange={onChange}
          />
        </div>
        <button  type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

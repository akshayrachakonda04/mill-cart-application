import React,{useState} from "react";
import RegistrationForm from "./RegistrationForm";
import { Link } from "react-router-dom";
import img3 from "./pictures/img3.jpg"
import user from './db.json';

function Login({setLoggedIn}){
    const [formData,setFormData]=useState({email:'',password:''});
    const [error, setError] = useState('');

    const handlechange=(e)=>{
        const {name,value}= e.target;
        setFormData({...formData,[name]:value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        // alert("Congrats you are logged in.");
        // if (validate()){
        //     // alert("Proceed");
        // // }
        //     fetch("https://localhost:4000/user/").then((res)=>{
        //     return res.json();
        //     }).then((resp)=>{
        //     console.log(resp)
        //     }).catch((err)=>{
        //     toast.error('Login Failed due to:'+err.message);
        //     });
        // }
    }
    const handleClick=()=>{
        const users = user.find(users => users.email === formData.email && users.password === formData.password);
    if (users) {
      setLoggedIn(true);
    } else {
      setError('Invalid username or password');
    }
    }
    // const validate = () =>{
    //     let result=true;
    //     if(formData.email==='' || formData.email===null){
    //         result=false;
    //         toast.warning("Please enter login credentials");
    //     }
    //     if(formData.password==="" || formData.password===null){
    //         result=false;
    //         toast.warning("Please enter Password");
    //     }
    //     return result;
    // }
    return(
        <div className="logc" style={{backgroundImage:`URL(${img3})`}}>
            <div className="logc2">
                <center> <h2> Login </h2></center>
               <div className="logc3">
                <form onSubmit={handleSubmit}> 
                <div className="inside">
                    <label>
                        Email:
                    </label>

                <div>
                    <input type="emial" name="email" value={formData.email} onChange={handlechange} required/>
                </div>
                <label>
                    Password:
                </label>
                <div>
                    <input type="password" name="password" value={formData.password} onChange={handlechange} required/>
                </div> 
                </div>
                <div className="butn">
                    <div>
                    <button className="btn1" type="submit" onClick={handleClick} >Login</button>
                    {error && <div>{error}</div>}
                    </div>
                </div>
                </form>
                </div>
            </div>
            <div className="acc">
                    <p> <center>Don't hava an account ? <Link to ="/RegistrationForm">Register</Link> </center></p>
            </div>
        </div>
    )
}

export default Login;

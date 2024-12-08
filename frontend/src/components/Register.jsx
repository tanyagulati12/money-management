
import "./register.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Register () {
    const navigator = useNavigate();
    const [signinData, setSignin] = useState({
        username: "",
        password: ""
    });

    const [signupData, setSignup] = useState({
        username: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    const handelSignup = async (e) => {
        e.preventDefault();
        try {
            let data = await fetch("http://localhost:8080/auth/signup", {
                method: "POST",
                body: JSON.stringify(signupData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            let dataJ = await data.json();
            if(data.ok) {
                localStorage.setItem("username", dataJ.username);
                window.location.assign("/");
            }else{
                alert(dataJ.message);
            }
            
            
        } catch(e) {
            console.log(e);
        }
    }

    const handleSignin = async (e) => {
        e.preventDefault();
        let data = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            body: JSON.stringify(signupData),
            headers: {
                "Content-Type": "application/json",
            },
        });
        let dataJ = await data.json();
            if(data.ok) {
                localStorage.setItem("username", dataJ.username);
                window.location.assign("/");
            }else{
                alert(dataJ.message);
            }
        }

    const handleSigninChange = (e) => {
        setSignin({...signinData, [e.target.name] : e.target.value})
    }

    const handleSignupChange = (e) => {
        setSignup({...signupData, [e.target.name] : e.target.value});
    } 

    const container = useRef(null);
    return (<div className="container" ref={container}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form" onSubmit={handleSignin}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username"  name="username" value={signinData.username} onChange={handleSigninChange}/>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" name="password" value={signinData.password} onChange={handleSigninChange}/>
              </div>
              <input type="submit" value="Login" className="btn solid" />
              {/* <p className="social-text">Or Sign in with social platforms</p> */}
              {/* <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div> */}
            </form>
            <form action="#" className="sign-up-form" onSubmit={handelSignup}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" name="username" value={signupData.username} onChange={handleSignupChange}/>
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" name="email" value={signupData.email} onChange={handleSignupChange}/>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" name="password" value={signupData.password} onChange={handleSignupChange}/>
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Confirm Password" name="confirmpassword" value={signupData.confirmpassword} onChange={handleSignupChange}/>
              </div>
              <input type="submit" className="btn" value="Sign up" />
              {/* <p className="social-text">Or Sign up with social platforms</p> */}
              {/* <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div> */}
            </form>
          </div>
        </div>
  
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              {/* <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                ex ratione. Aliquid!
              </p> */}
              <button className="btn transparent" id="sign-up-btn" onClick={() => {
  container.current.classList.add("sign-up-mode");
}}>
                Sign up
              </button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>One of us ?</h3>
              {/* <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                laboriosam ad deleniti.
              </p> */}
              <button className="btn transparent" id="sign-in-btn" onClick={() => {
  container.current.classList.remove("sign-up-mode");
}}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>)
}
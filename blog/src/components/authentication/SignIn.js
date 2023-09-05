import React, { useState } from "react";
import '../../static/authentication/signin.css'
import axios from "axios";
import { setUserSession } from "../../utils/Common";
import { useNavigate } from "react-router-dom";

function SignIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const clickHandler = () => {
    setLoading(true);
    console.log("user", username, password)
    axios
      .post("/users/signin", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log("response", response)
        setLoading(false);
        console.log("res", response)
        setUserSession(response.data.token, response.data.user);
        navigate("/blog/posts");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.message);
      });
  };

  const clickSignupHandler = () => {
    navigate("/signup");
  };

  return (
    <div id="signin" className="d-flex flex-column justify-content-center align-items-center mt-0">
      <div className="signincontainer">
        <div className="signinbody d-flex flex-column align-items-center p-5">
          <div className="heading mt-4">
            <h1>SIGN IN</h1>
          </div>
          <div className="d-flex flex-column mt-5">
            <form>
              <input className="input w-100" type="text" name="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
              <br />
              <input className="w-100 mt-5"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)} />

              <input
                className="w-100 mt-5"
                name="signin"
                type="button"
                value={loading ? "Loading..." : "SIGN IN"}
                onClick={clickHandler}
                disabled={loading} />
              {error && (
                <>
                  <small style={{ color: "red" }}>{error}</small>
                  <br />
                </>
              )}
              <br />
              <small className="text-center">
                <span id="or" className="text-center">OR</span> 
              </small>
              <br />
              <small>
                <span id="acc">Not Have an account? </span>
              </small>
              <input
                className="w-100 mt-3 mb-5"
                type="button"
                value={"CREATE ACCOUNT"}
                onClick={clickSignupHandler} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;


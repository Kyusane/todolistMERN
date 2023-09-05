import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import Loader from "../components/Loader";

const Login = () => {
     const [loading, setLoading] = useState(false);
     const navigate = useNavigate();
     const [error, setError] = useState(null);
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const { user, dispatchAuth } = useAuthContext();

     useEffect(() => {
          if (localStorage.getItem("token")) {
               navigate("/");
          }
     }, []);

     const loginHandler = async (e) => {
          try {
               setLoading(true);
               e.preventDefault();
               let data = { email: email, password: password };
               const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/user/login`,
                    {
                         method: "POST",
                         body: JSON.stringify(data),
                         headers: {
                              "Content-Type": "application/json",
                         },
                    }
               );

               const json = await response.json();

               if (!response.ok) {
                    setError(json.error);
               }

               if (json.token && json.email) {
                    dispatchAuth({ type: "LOGIN", payload: json });
                    localStorage.setItem("token", json.token);
                    localStorage.setItem("email", json.email);
                    navigate("/");
               } else {
                    if (json.error == "Incorrect password") {
                         setPassword(null);
                    }
                    setError(json.error);
               }
               setLoading(false);
               
          } catch (err) {
               setError(err);
          }
     };

     return (
          <>
               <div className="login">
                    <div className="form">
                         {loading ? (
                              <Loader />
                         ) : (
                              <form onSubmit={loginHandler}>
                                   <h3>Login</h3>
                                   <label>Email :</label>
                                   <input
                                        required
                                        type="email"
                                        placeholder="ntheatere@nstve.dev"
                                        onChange={(e) => setEmail(e.target.value)}
                                   ></input>
                                   <label>Password :</label>
                                   <input
                                        required
                                        type="password"
                                        placeholder="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                   ></input>
                                   {error ? (
                                        <div className="error">
                                             <p>{error}</p>
                                        </div>
                                   ) : (
                                        <p></p>
                                   )}
                                   <button type="submit"> Login </button>
                              </form>
                         )}
                    </div>
               </div>
          </>
     );
};

export default Login;

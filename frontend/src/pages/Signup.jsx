import { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom'

import Loader from "../components/Loader";

const Signup = () => {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [coPassword, setCoPassword] = useState('')
     const [error, setError] = useState(null)
     const [success, setSuccess] =  useState(null)

     const [loading, setLoading] = useState(false)

     const navigate = useNavigate()

     useEffect(()=>{
          if(sessionStorage.getItem("token")){
               navigate('/')
          }
     
          setTimeout(() => {
               setError(null)
               setSuccess(null)
          }, 3000)
     } , [error, success])

     const handleSubmit = async (e) => {
          setLoading(true)
          e.preventDefault()

          let user = { email : email , password : password}

          if(password == coPassword){
               
               const response = await fetch(`${import.meta.env.VITE_API_DOMAIN}/api/user/signup`,{
                    method : 'POST',
                    headers : {
                         'Content-Type' : "application/json"
                    },
                    body : JSON.stringify(user)
               })

               const json = await response.json()

               if(json.error){
                    setError(json.error)
               }else{
                    setSuccess("Pendaftaran Berhasil") 
               }

               setEmail('')
               setPassword('')
               setCoPassword('')
          }else{
               setError("Confirm Password tidak sesuai")
          }
          setLoading(false)
     }

     return(
          <div className="signup">
               <form  className="sg-form"onSubmit ={handleSubmit}>
               {    
                    loading? <div className="loadWrapper"><Loader/></div> :(
                         <>
                                   <h3>Sign Up</h3>
                                   <label>Email :</label>
                                   <input
                                        type = "email"
                                        placeholder="ntheatere@nstve.dev"
                                        onChange = {e => setEmail(e.target.value)}
                                        value = {email}
                                        required
                                        />
                                   <label>Password :</label>
                                   <input
                                        type = "password"
                                        placeholder="password"
                                        onChange = {e => setPassword(e.target.value)}
                                        value = {password}
                                        required
                                        />
                                   <label>Confirm Password :</label>
                                   <input
                                        type = "password"
                                        placeholder="confirm password"
                                        onChange = {e => setCoPassword(e.target.value)}
                                        value = {coPassword}
                                        required
                                        />    
                                   {error? <div className="error"><p>{error}</p></div> : (<button type='submit'>Sign Up</button>)}
                                   {success?<div className="success"><p>{success}</p></div> : null}
                                   
                         </>
                    )
     
               }    
               </form>  
          </div>
     )
}

export default Signup
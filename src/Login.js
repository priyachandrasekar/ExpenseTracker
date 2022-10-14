import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from './firebase'

function Login() {
  const [loginEmail,setLoginEmail] = useState("");
  const [loginPassword,setLoginPassword] = useState("");
  const navigate=useNavigate();

  const login = async() => {

    // e.preventDefault();
    try{
            const user = await signInWithEmailAndPassword(auth,loginEmail,loginPassword)
            console.log(user)
            navigate(`/home/${loginEmail}`);
  
    } catch(error){
        console.log(error.message)
        alert(error.message)
    }
  };
  return (
    <div>
        <div className='col-1'>
            <h2>Login</h2>
            
                <input type='email' placeholder='username' onChange={(event) => {setLoginEmail(event.target.value)}}></input><br></br>
                <input type='password' placeholder='Password' onChange={(event) => {setLoginPassword(event.target.value)}}></input><br></br>
                <button className='btn' onClick={login}> Submit</button><br></br>
                <Link to="/">Sign Up</Link>

           
        </div>
    </div>
  )
}

export default Login
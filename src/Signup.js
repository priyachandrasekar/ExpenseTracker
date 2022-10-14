import React from 'react'
import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {createUserWithEmailAndPassword} from 'firebase/auth'; 
import {auth} from './firebase'
import {db} from './firebase'
import {doc, collection, onSnapshot, addDoc, query,getDoc, orderBy, deleteDoc, setDoc, where} from "firebase/firestore";

function Signup() { 
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const navigate=useNavigate();

  const register = async() => {
    try{
        if (registerPassword === registerConfirmPassword ) {

            const user = await createUserWithEmailAndPassword(auth,registerEmail,registerPassword,registerConfirmPassword)
            console.log(user)
            addDoc(collection(db,"Expense"),
            {
            email:registerEmail,
            timeStamp:new Date()
            })
            navigate(`/home/${registerEmail}`)
        }
        else{
            alert('password is not matching')
        }
    } catch(error){
        console.log(error.message)
    }
    
  };
  
    
  return (
    <div>

        <div className='col-1'>
            <h2>Sign Up</h2>
            <div id='form'>
                <input type='email' placeholder='username' onChange={(event) => {setRegisterEmail(event.target.value)}}></input><br></br>
                <input type='password' placeholder='Password' onChange={(event) => {setRegisterPassword(event.target.value)}}></input><br></br>
                <input type='password' placeholder='confirm password' onChange={(event) => {setRegisterConfirmPassword(event.target.value)}}></input><br></br>
                <button className='btn' onClick={register}>Submit</button><br></br>
                <p>Already user sign in</p>  <Link to="/login">sign in</Link>
            </div>
        </div>
    </div>
  )
}

export default Signup
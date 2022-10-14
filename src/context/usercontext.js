import { createContext, useEffect, useState, useContext } from "react";
import{
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sighOut,
    onAuthStageChanged
}from "firebase/auth";
import {auth} from '../firebase';

const userContext=createContext();
export function userContext({ children }){
    const [user,setUser]=useState("");
    const [loading, setLoading] = useState(true)

    function signUp(email,password){
        return createUserWithEmailAndPassword(auth, email,password);
    }
    function logIn(email,password){
        return signInWithEmailAndPassword(auth, email,password);
    }
    const value ={ user, signUp, logIn }

    useEffect(() =>{
        const unsubscribe = onAuthStageChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        });
        return () =>{
            unsubscribe();
        }
    }, []);
    return <userContext.provider value = {value}>{!loading && children} </userContext.provider>

    }
export function useUserAuth(){
        return useContext(userContext);
}

import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
// import axios from "axios";

export const AuthContext=createContext();
const auth=getAuth(app);

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const axiosPublic=useAxiosPublic();

    const createUser=(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }  

    const signIn=(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logOut=()=>{
        setLoading(true);
        return signOut(auth);
    }  
    const updateUserProfile=(name,photo)=>{
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL:photo
          })
    } 
    const googleAuthProvider=new GoogleAuthProvider();
    const signWithgoogle=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleAuthProvider);
    } 
    const githubAuthProvider=new GithubAuthProvider();
    const signWithGithub=()=>{
        setLoading(true);
        return signInWithPopup(auth,githubAuthProvider);
    }
    
    useEffect(()=>{
        const unSubscribe=onAuthStateChanged(auth, currentUser=>{            
            setUser(currentUser); 
            setLoading(false);              
            console.log({currentUser},{loading});
            if(currentUser){
                // get token and store client
                const userInfo={email:currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                    .then(res=>{
                        const token=res.data?.token;
                        if(token){
                            localStorage.setItem('token',token);
                        }
                    })
            }
            else{
                // rremove token from 
                localStorage.removeItem('token');
            }
                     
        })
        return ()=>{
            unSubscribe();
        }
    },[axiosPublic,loading])

    const authInfo={
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        signWithgoogle,
        signWithGithub,
    }
    return (
        <AuthContext.Provider value={authInfo}>
             {children}            
        </AuthContext.Provider>
    );
};

export default AuthProvider;
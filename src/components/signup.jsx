import React, { useEffect, useRef, useState } from 'react'
import app, { auth, firebaseConfig, googleAuthProvider, facebookAuthProvider, githubAuthProvider } from '../firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';
import Profile from './profile';
import github from "../assets/github.png"
import google from "../assets/google.png"
import facebook from "../assets/facebook.png"

const Signup = () => {
    const email = useRef(null)
    const password = useRef(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const handleSubmit = () => {
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                setIsLoggedIn(true)
                toast.success(`User Registered Successfully`, {
                    duration: 3000,
                    position: 'top-right',
                });
            })
            .catch((error) => {
                console.error(error.message);
                toast.error(`Registration failed : ${error.message}`, {
                    duration: 3000,
                    position: 'top-right',
                });
            });
        email.current.value = null
        password.current.value = null

    }
    const logout = () => {
        signOut(auth).then(() => {
            setIsLoggedIn(false);
            toast.success(`Logout successfully`, {
                duration: 3000,
                position: 'top-right',
            });
        })
    }
    const signUpWithGoogle = () => {
        signInWithPopup(auth, googleAuthProvider)
            .then((userCredential) => {
                setIsLoggedIn(true)
                toast.success(`User Registered Successfully`, {
                    duration: 3000,
                    position: 'top-right',
                });
            })
            .catch((error) => {
                console.error(error.code, error.message);
                toast.error(`Registration failed : ${error.message}`, {
                    duration: 3000,
                    position: 'top-right',
                });
            });
        email.current.value = null
        password.current.value = null

    }
    const signupWithFacebook = () => {
        signInWithPopup(auth, facebookAuthProvider)
            .then((userCredential) => {
                console.log(userCredential, "Facebook userCredential");
                setIsLoggedIn(true)
                toast.success(`User Registered Successfully`, {
                    duration: 3000,
                    position: 'top-right',
                });
            })
            .catch((error) => {
                console.log();
                toast.error(`Registration failed : ${error.code}`, {
                    duration: 3000,
                    position: 'top-right',
                });
            });
        email.current.value = null
        password.current.value = null

    }
    const signUpWithGithub = () => {
        signInWithPopup(auth, githubAuthProvider)
            .then((userCredential) => {
                console.log(userCredential, "Facebook userCredential");
                setIsLoggedIn(true)
                toast.success(`User Registered Successfully`, {
                    duration: 3000,
                    position: 'top-right',
                });
            })
            .catch((error) => {
                console.log();
                toast.error(`Registration failed : ${error.code}`, {
                    duration: 3000,
                    position: 'top-right',
                });
            });
        email.current.value = null
        password.current.value = null
    }



    return (
        <div >
            {isLoggedIn ? <Profile username={auth?.currentUser?.displayName} email={auth?.currentUser?.email} desc={"Full Stack Developer"} photoUrl={auth?.currentUser?.photoURL} logoutFn={logout} /> : <div className='d-flex flex-column gap-3'>
                <h3>Signup</h3>
                <input type="text" className='form-control' ref={email} onChange={(e) => email.current.value = e.target.value} placeholder='Enter Your Email' />
                <input type="password" className="form-control" ref={password} onChange={(e) => password.current.value = e.target.value} placeholder='Enter Your password' />
                <button onClick={handleSubmit} className='btn bg-primary text-white'>Submit</button>
                <p>or</p>
                <button onClick={signUpWithGoogle} className='border p-2'><img src={google} alt="google logo" width={"30px"} /> Continue with Google</button>
                <button onClick={signupWithFacebook} className='border p-2'><img src={facebook} alt="facebook logo" width={"30px"} /> Continue with Facebook</button>
                <button onClick={signUpWithGithub} className='border p-2'><img src={github} alt="github logo" width={"30px"} /> Continue with GitHub</button>
            </div>}
            <Toaster />

        </div>
    )
}

export default Signup
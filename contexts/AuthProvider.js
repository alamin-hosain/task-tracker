import React, { createContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebaseConfig';


const auth = getAuth(app);
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    useEffect(() => {
        setLoading(true)
        const unsubscribe = onAuthStateChanged(auth, loggedUser => {
            setUser(loggedUser);
            setLoading(false)
        })
        return () => unsubscribe();

    }, [])

    // 1. Create User
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // 2. Sign In 
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // 3. LogOut
    const logOut = () => {
        return signOut(auth);

    }

    // 4. Google Sign In
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // 5. update profile
    const upDateUserInfo = (name) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
        })
    }

    const authInfo = { user, loading, setLoading, createUser, signIn, logOut, googleSignIn, upDateUserInfo };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
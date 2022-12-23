import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {

    const initialToken = localStorage.getItem('token');
    const initialUserId = localStorage.getItem('uID');
    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(initialUserId);
    const userIsLoggedIn = !!token;

    const loginHandler = (tkn,uID) => {
        setToken(tkn);
        localStorage.setItem('token', tkn);
        setUserId(uID);
        localStorage.setItem('uID',uID);
    }
    const logoutHandler = () => {
        setToken(null);
        setUserId('');
        localStorage.clear('token');
        localStorage.clear('uID');
    }

    const authContextValue = {
        token: token,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };
    return (
        <AuthContext.Provider value={authContextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
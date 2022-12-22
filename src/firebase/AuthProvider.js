import { useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {

    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState('');
    const userIsLoggedIn = !!token;

    const loginHandler = (tkn,uID) => {
        setToken(tkn);
        setUserId(uID)
        localStorage.setItem('token', tkn);
    }
    const logoutHandler = () => {
        setToken(null);
        localStorage.clear('token');
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
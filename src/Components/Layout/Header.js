import React, { Fragment, useContext } from "react";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import AuthContext from "../../firebase/auth-context";

const Header = (props) => {
    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
        authCtx.logout();
    }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler ms-3" data-bs-toggle="collapse" data-bs-target="#navBar1" aria-controls="navBar1" aria-label="Expand Navigation">
                    <div className="navbar-toggler-icon" />
                </button>
                <NavLink className="navbar-brand ms-3" to="#">Expense Tracker</NavLink>

                <div className="collapse navbar-collapse justify-content-center" id="navBar1">
                    <ul className="navbar-nav mr-auto ms-sm-3">
                        {authCtx.isLoggedIn && <li className="nav-item">
                            <NavLink to="/home" className="nav-link">Home</NavLink>
                        </li>}
                        {!authCtx.isLoggedIn && <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                        </li>}
                        {!authCtx.isLoggedIn && <li className="nav-item">
                            <NavLink to="/signup" className="nav-link" >Sign Up</NavLink>
                        </li>}
                    </ul>
                </div>
                <div>
                    {authCtx.isLoggedIn && <NavLink to="/profile" className="nav-link text-white me-2" >My Profile</NavLink>}
                </div>
                    {authCtx.isLoggedIn && <Button onClick={logoutHandler} className="me-3">Logout</Button>}
            </nav>
        </Fragment>
    );
};

export default Header;
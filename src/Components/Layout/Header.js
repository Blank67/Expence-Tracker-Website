import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { darkActions } from "../../store/darkTheme-slice";
import { expenseActions } from "../../store/expenses-slice";

const Header = (props) => {
    const loginStatus = useSelector((state) => (state.auth.isLoggedIn));
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
        dispatch(expenseActions.clearSliceOnLogout());
        dispatch(darkActions.logoutTheme());
    }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler ms-3" data-bs-toggle="collapse" data-bs-target="#navBar1" aria-controls="navBar1" aria-label="Expand Navigation">
                    <div className="navbar-toggler-icon" />
                </button>
                <NavLink className="navbar-brand ms-3" to={loginStatus ? "/home" : "/login"}>Expense Tracker</NavLink>

                <div className="collapse navbar-collapse justify-content-center" id="navBar1">
                    <ul className="navbar-nav mr-auto ms-sm-3">
                        {loginStatus && <li className="nav-item">
                            <NavLink to="/home" className="nav-link">Home</NavLink>
                        </li>}
                        {!loginStatus && <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                        </li>}
                        {!loginStatus && <li className="nav-item">
                            <NavLink to="/signup" className="nav-link" >Sign Up</NavLink>
                        </li>}
                    </ul>
                </div>
                <div>
                    {loginStatus && <NavLink to="/profile" className="nav-link text-white me-2" >My Profile</NavLink>}
                </div>
                {loginStatus && <Button onClick={logoutHandler} className="me-3">Logout</Button>}
            </nav>
        </Fragment>
    );
};

export default Header;
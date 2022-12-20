import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Header = (props) => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler ms-3" data-bs-toggle="collapse" data-bs-target="#navBar1" aria-controls="navBar1" aria-label="Expand Navigation">
                    <div className="navbar-toggler-icon" />
                </button>
                <NavLink className="navbar-brand" to="#">Expense Tracker</NavLink>

                <div className="collapse navbar-collapse justify-content-center" id="navBar1">
                    <ul className="navbar-nav mr-auto ms-sm-3">
                        <li className="nav-item">
                            <NavLink to="/login" className="nav-link">Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/signup" className="nav-link" >Sign Up</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </Fragment>
    );
};

export default Header;
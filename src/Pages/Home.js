import { Fragment, useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../firebase/auth-context";

const Home = (props) => {

    const [profileCompleted, setProfileCompleted] = useState(false);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDNiGP2YbgqnIMHk-jicOFmjCh_0TUERf8';
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({ idToken: authCtx.token }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const transformedResponse = await response.json();
                console.log(response);
                console.log(transformedResponse);
                if (response.ok) {
                    if (transformedResponse.users[0].displayName) {
                        setProfileCompleted(true);
                    } else {
                        setProfileCompleted(false);
                    }
                } else {
                    let errorMessage = 'Authentication Failed!';
                    if (transformedResponse.error.message) {
                        errorMessage = transformedResponse.error.message;
                    }
                    throw new Error(errorMessage);
                }
            } catch (err) {
                alert(err.message);
            }

        }
        getData();
    }, [authCtx.token]);

    return (
        <Fragment><div>

            {!profileCompleted && <NavLink to='/profile' className="nav-link float-end me-3 text-danger">Complete your profile</NavLink>}
            <h1>Welcome to Expense Tracker!</h1>
        </div>
        </Fragment>
    );
}

export default Home;
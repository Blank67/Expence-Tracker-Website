import { Fragment, useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Expenses from "../Components/Expense/Expenses";
import AuthContext from "../Context/FirebaseContext/auth-context";

const Home = (props) => {

    const [profileCompleted, setProfileCompleted] = useState(true);
    const [emailVerified, setEmailVerified] = useState(true);
    const authCtx = useContext(AuthContext);
    const token = useSelector((state) => (state.auth.token));

    useEffect(() => {
        const getData = async () => {
            try {
                const url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDNiGP2YbgqnIMHk-jicOFmjCh_0TUERf8';
                const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({ idToken: token }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const transformedResponse = await response.json();
                if (response.ok) {
                    if (!transformedResponse.users[0].displayName) {
                        setProfileCompleted(false);
                    } else {
                        setProfileCompleted(true);
                    }
                    if (transformedResponse.users[0].emailVerified) {
                        setEmailVerified(true);
                    } else {
                        setEmailVerified(false);
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
        <Fragment>
            <Container fluid>
                <Row>
                    <Col>
                        <h2>Welcome to Expense Tracker</h2>
                    </Col>
                    <Col>
                        {(!profileCompleted || !emailVerified) &&
                            <p className="nav-link float-end">
                                Your profile is incomplete.&nbsp;
                                <NavLink to='/profile' className="float-end me-3 text-danger">
                                    <span>Complete Now.</span>
                                </NavLink>
                            </p>}
                    </Col>
                </Row>
                <hr style={{ borderWidth: '2px' }} />
            </Container>
            <section>
                <Expenses />
            </section>
        </Fragment>
    );
}

export default Home;
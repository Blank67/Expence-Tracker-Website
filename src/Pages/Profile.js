import { useContext, useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import AuthContext from "../firebase/auth-context";

const Profile = (props) => {

    const nameRef = useRef('');
    const newPassRef = useRef('');
    const [errorDetails, setErrorDetails] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
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
                console.log(response);
                const transformedResponse = await response.json();
                console.log(transformedResponse);
                if (response.ok) {
                    if (transformedResponse.users[0].displayName) {
                        nameRef.current.value = transformedResponse.users[0].displayName;
                    } else {
                        nameRef.current.value = '';
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

    const detailSaveHandler = async (e) => {
        e.preventDefault();
        if (nameRef.current.value === '') {
            setErrorDetails(true);
            return;
        }
        setErrorDetails(false);
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDNiGP2YbgqnIMHk-jicOFmjCh_0TUERf8';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token,
                    displayName: nameRef.current.value,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response);
            const transformedResponse = await response.json();
            console.log(transformedResponse);
            if (response.ok) {
                if (transformedResponse.displayName) {
                    nameRef.current.value = transformedResponse.displayName;
                } else {
                    nameRef.current.value = '';
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

    const passwordChangeHandler = (e) => {
        e.preventDefault();
        if (newPassRef.current.value.length < 6) {
            setErrorPassword(true);
            return;
        }
        setErrorPassword(false);

    }

    return (
        <Container>
            <Row className="justify-content-center mt-5 mx-3">
                <Col xs={4}>
                    <Card className="shadow-lg">
                        <Card.Header className="text-center p-3">Contact Details</Card.Header>
                        <Card.Body style={{ backgroundColor: '#f7f5f0' }}>
                            {errorDetails && <p className="text-center text-danger">Details cannot be empty.</p>}
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="firstname">Full Name:</Form.Label>
                                    <Form.Control id="firstname" type="text" required ref={nameRef} />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="warning" type="submit" onClick={detailSaveHandler}>Update</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={4}>
                    <Card className="shadow-lg">
                        <Card.Header className="text-center p-3">Change Password</Card.Header>
                        <Card.Body style={{ backgroundColor: '#f7f5f0' }}>
                            {errorPassword && <p className="text-center text-danger">Password length should be greater than 5.</p>}
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>New Password:</Form.Label>
                                    <Form.Control id="newpassword" type="password" required ref={newPassRef} />
                                </Form.Group >
                                <div className="text-center">
                                    <Button variant="warning" type="submit" onClick={passwordChangeHandler}>Change Password</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center mt-5 mx-3">

            </Row>
        </Container>
    );
}

export default Profile;
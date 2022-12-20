import { useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const SignUp = (prop) => {
    const emailRef = useRef();
    const passRef = useRef();
    const confRef = useRef();
    const history = useHistory();
    const [error, setError] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!emailRef.current.value.includes('@') || passRef.current.value.length < 6 || passRef.current.value !== confRef.current.value) {
            setError(true);
            return;
        }
        setError(false);
        const user = {
            email: emailRef.current.value,
            password: passRef.current.value
        }
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNiGP2YbgqnIMHk-jicOFmjCh_0TUERf8';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ ...user, returnSecureToken: true }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const transformedResponse = await response.json();
            if (response.ok) {
                alert('Account Created!');
                // history.replace('/login');
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
    const onLoginClickHandler = () => {
        history.replace('/login');
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={4}>
                    <Card className="shadow-lg">
                        <Card.Header className="text-center p-3">
                            <h4>SignUp</h4>
                        </Card.Header>
                        <Card.Body style={{ backgroundColor: '#f7f5f0' }}>
                            <Form>
                                {error && <p className="text-center text-danger">Invalid data.</p>}
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    <Form.Control id="email" type="email" required ref={emailRef} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="pass">Password</Form.Label>
                                    <Form.Control id="pass" type="password" required ref={passRef} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="conPass">Confirm Password</Form.Label>
                                    <Form.Control id="conPass" type="password" required ref={confRef} />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="warning" type="submit" onClick={onSubmitHandler}>SignUp</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="justify-content-center pt-3">
                <Col xs={4}>
                    <div className="d-grid">
                        <Button onClick={onLoginClickHandler}>Have an account? Login</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default SignUp;
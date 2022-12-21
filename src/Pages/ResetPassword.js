import { useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const ResetPassword = (props) => {
    const emailRef = useRef('');
    const [mailSent, setMailSent] = useState(false);
    const [error, setError] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setError(false);
        setMailSent(false);
        if (!emailRef.current.value.includes('@')) {
            setMailSent(false);
            setError(true);
            return;
        }
        try {
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDNiGP2YbgqnIMHk-jicOFmjCh_0TUERf8';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'PASSWORD_RESET',
                    email: emailRef.current.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const transformedResponse = await response.json();
            console.log(response);
            console.log(transformedResponse);
            if(response.ok){
                setMailSent(true);
                setError(false);
            }else{
                setMailSent(false);
                setError(true);
                throw new Error(transformedResponse.error.message);
            }
        } catch (err) { 
            setMailSent(false);
            alert(err.message);
        }
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col xs={4}>
                    <Card className="shadow-lg">
                        <Card.Header className="text-center p-3">
                            <h4>Password Reset</h4>
                        </Card.Header>
                        <Card.Body style={{ backgroundColor: '#f7f5f0' }}>
                            <Form>
                                {mailSent && <p className="text-info text-center">Password reset link sent to {emailRef.current.value}.</p>}
                                {error && <p className="text-danger text-center">Enter a valid email.</p>}
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="email">Registered Email</Form.Label>
                                    <Form.Control id="email" type="email" required ref={emailRef} />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="warning" type="submit" onClick={onSubmitHandler}>Reset Password</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ResetPassword;
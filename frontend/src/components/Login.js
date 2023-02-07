import React, { useRef } from "react";
import { Form, Card, Button, Alert, Container } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext.js";

export default function Login() {
  const { isAccessCode, validateAccessCode, createNewAccessCode, message } =
    useAuthContext();
  const phoneRef = useRef();
  const codeRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const phoneNumber = phoneRef.current.value;
    const otp = codeRef.current.value;
    if (!isAccessCode) {
      createNewAccessCode(phoneNumber);
    }
    if (isAccessCode) {
      validateAccessCode(phoneNumber, otp);
    }
  }

  return (
    <Container
      style={{ minHeight: "100vh" }}
      className="d-flex align-items-center justify-content-center"
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Github Users Search</h2>
            {message && (
              <Alert
                className="text-center mb-4"
                variant={isAccessCode ? "success" : "warning"}
              >
                {message}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  disabled={isAccessCode}
                  type="text"
                  ref={phoneRef}
                  onFocus={(e) => {
                    e.target.value = "+84981153565";
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-4" id="access-code">
                <Form.Label>Access Code</Form.Label>
                <Form.Control
                  disabled={!isAccessCode}
                  type="text"
                  ref={codeRef}
                />
              </Form.Group>
              <Button className="w-100" type="submit">
                {isAccessCode ? "Log In" : "Get Access Code"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Alert className="mt-4" key="warning" variant="warning">
          <b>Note</b>: Trial account on Twilio only accept my phone number to
          receive SMS, I have to fixed my phone: +84981153565
          <br />
          Get Access Code, I will directly show it here. Or you can email
          tahbertnguyen@gmail.com to get the code Twilio send to my phone.
        </Alert>
      </div>
    </Container>
  );
}

import React, { useRef } from 'react'
import { Form, Card, Button, Alert, Container } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext.js'

export default function Login() {
    const { isAccessCode,
        validateAccessCode,
        createNewAccessCode,
        message } = useAuthContext()
    const phoneRef = useRef()
    const codeRef = useRef()

    function handleSubmit(e) {
        e.preventDefault()
        const phoneNumber = phoneRef.current.value
        const otp = codeRef.current.value
        if (!isAccessCode) {
            createNewAccessCode(phoneNumber)
        }
        if (isAccessCode) {
            validateAccessCode(phoneNumber, otp)
        }
    }

    return (
        <Container style={{ minHeight: '100vh' }}
            className='d-flex align-items-center justify-content-center'>
            <div className='w-100' style={{ maxWidth: '400px' }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Search Github Users</h2>
                        {message && <Alert className='text-center mb-4' variant={isAccessCode ? 'success' : 'warning'}>{message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-4' id='phone'>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control disabled={isAccessCode} type='tel' ref={phoneRef} />
                            </Form.Group>
                            <Form.Group className='mb-4' id='access-code'>
                                <Form.Label>Access Code</Form.Label>
                                <Form.Control disabled={!isAccessCode} type='text' ref={codeRef} />
                            </Form.Group>
                            <Button className='w-100'
                                type='submit'>
                                {isAccessCode ? 'Log In' : 'Get Access Code'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Enter your phone number to use Search-Github-Users
                </div>
            </div>
        </Container>
    )
}

import React from 'react'
import NavigationBar from '../components/NavigationBar'
import { useAuthContext } from '../contexts/AuthContext.js'
import { Outlet, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'

export default function SharedLayout() {
    const { isLoggedIn } = useAuthContext()
    const navigate = useNavigate()

    if (!isLoggedIn) {
        return (
            <Container
                style={{ minHeight: '100vh' }}
                className='align-items-center justify-content-center d-flex'>
                <div>
                    <Card>
                        <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
                            <h2 className='text-center mb-4'>
                                Login to use Search Github Users
                            </h2>
                            <Button onClick={() => navigate('/login')}>Log In</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Container>
        )
    }
    return (
        <div>
            <NavigationBar />
            <Outlet />
        </div>

    )
}

import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContext.js'
import { Alert, Card, Container, Spinner } from 'react-bootstrap'
import Heart from './Heart.js'

export default function ListView({ users }) {
    const [ids, setIds] = useState([])
    const { isLoading, userProfile: { favorite_github_users } } = useAuthContext()
    useEffect(() => {
        setIds(favorite_github_users?.map(item => item.id))
    }, [favorite_github_users])

    console.log(ids)
    if (isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
    if (users && users.length > 0) {
        return (
            <Container>
                {users.map(item => {
                    const likeStatus = ids.includes(item.id)
                    return (
                        <Card className='mb-4' key={item.id} style={{ width: '18rem' }}>
                            <Card.Img variant='top' src={item.avatar_url} alt={item.login} />
                            <Card.Body>
                                <Heart user={item} isHearted={likeStatus} />
                                <Card.Title style={{ textTransform: 'capitalize' }}>{item.login}</Card.Title>
                                <Card.Subtitle>ID: {item.id}</Card.Subtitle>
                                <Card.Link href={item.html_url}>Link to Github </Card.Link>
                            </Card.Body>
                        </Card>
                    )
                })}
            </Container>
        )
    }

    return (
        <Container
            style={{ maxWidth: '400px' }}>
            <Alert
                variant='primary'
                className='text-center'>
                Enter to search Github users
            </Alert>
        </Container>
    )
}

import React from 'react'
import styled from 'styled-components'
import { Container } from "react-bootstrap"
import ListView from './ListView.js'
import Hero from './Hero.js'
import { useAuthContext } from '../contexts/AuthContext.js'

export default function DashBoard() {
    const { data: { total_count, items } } = useAuthContext()
    return (
        <Container>
            <Wrapper>
                <Hero count={total_count} />
                <ListView users={items} />
            </Wrapper>
        </Container>
    )
}
const Wrapper = styled.div`
    max-width: 95vw;
`
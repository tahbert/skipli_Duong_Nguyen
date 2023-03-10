import React from "react";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import ListView from "./ListView.js";
import PageControl from "./PageControl.js";
import { useAuthContext } from "../contexts/AuthContext.js";

export default function DashBoard() {
  const {
    data: { items },
  } = useAuthContext();
  return (
    <Container>
      <Wrapper>
        <PageControl />
        <ListView users={items} />
      </Wrapper>
    </Container>
  );
}
const Wrapper = styled.div`
  max-width: 95vw;
`;

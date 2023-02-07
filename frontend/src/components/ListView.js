import React, { useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext.js";
import { Alert, Container, Spinner, Table } from "react-bootstrap";
import Heart from "./Heart.js";

export default function ListView({ users }) {
  const [ids, setIds] = useState([]);
  const {
    isLoading,
    userProfile: { favorite_github_users },
  } = useAuthContext();

  useEffect(() => {
    if (favorite_github_users) {
      setIds(favorite_github_users?.map((item) => item.id));
    }
  }, [favorite_github_users]);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (users && users.length > 0) {
    return (
      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>avatar</th>
              <th>id</th>
              <th>login</th>
              <th>git link</th>
              <th>public repos</th>
              <th>followers</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => {
              const likeStatus = ids.includes(item.id);
              return (
                <tr key={item.id}>
                  <td>
                    <img
                      className="avatar"
                      src={item.avatar_url}
                      alt={item.login}
                    />
                    <Heart user={item} isHearted={likeStatus} />
                  </td>
                  <td>{item.id}</td>
                  <td>{item.login}</td>
                  <td>
                    <a href={item.html_url}>{item.html_url}</a>
                  </td>
                  <td>
                    <a href={item.repos_url}>link</a>
                  </td>
                  <td>
                    <a href={item.followers_url}>link</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  }

  return (
    <Container style={{ maxWidth: "400px" }}>
      <Alert variant="primary" className="text-center">
        Your search is empty, typing to search now!
      </Alert>
    </Container>
  );
}

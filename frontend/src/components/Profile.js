import { Container, Table } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

const User = () => {
  const { userProfile } = useAuthContext();
  const { phoneNumber, favorite_github_users } = userProfile;

  return (
    <Container>
      <h1>Your Profile</h1>
      <p>Your phone: {phoneNumber}</p>
      <p>List of github users you have liked: </p>
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
          {favorite_github_users?.map((item) => {
            return (
              <tr key={item.id}>
                <td>
                  <img
                    className="avatar"
                    src={item.avatar_url}
                    alt={item.login}
                  />
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
};
export default User;

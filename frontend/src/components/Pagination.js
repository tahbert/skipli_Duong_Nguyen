import { Container } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";

const Pagination = () => {
  const { paginate, usersPerPage, totalUsers } = useAuthContext();

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <Container>
      <ul className="pagination">
        {pageNumbers.map((p) => {
          return (
            <li className="page-item" key={p} onClick={() => paginate(p)}>
              {p}
            </li>
          );
        })}
      </ul>
    </Container>
  );
};
export default Pagination;

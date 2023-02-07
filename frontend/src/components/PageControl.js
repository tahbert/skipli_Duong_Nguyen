import Pagination from "./Pagination";
import UsersPerPage from "./UsersPerPage";
import { Container } from "react-bootstrap";

const PageControl = () => {
  return (
    <Container className="page-control">
      <Pagination />
      <UsersPerPage />
    </Container>
  );
};
export default PageControl;

import { useAuthContext } from "../contexts/AuthContext";

const Pagination = () => {
  const { usersPerPage, setUsersPerPage } = useAuthContext();

  // options
  const options = [
    { value: "100", text: "100" },
    { value: "50", text: "50" },
    { value: "20", text: "20" },
  ];
  const handleOptions = (e) => {
    setUsersPerPage(e.target.value);
  };

  return (
    <div className="user-per-page">
      <label>User Per Page: </label>
      <select value={usersPerPage} onChange={handleOptions}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Pagination;

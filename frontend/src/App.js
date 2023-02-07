import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./components/DashBoard.js";
import PrivateRoute from "./components/PrivateRoute.js";
import ErrorPage from "./components/ErrorPage.js";
import SharedLayout from "./components/SharedLayout.js";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<DashBoard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="/login"
            element={
              <PrivateRoute>
                <Login />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

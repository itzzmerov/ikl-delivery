import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LandingPage from "./components/LandingPage";
import { useAuth } from "./hooks/useAuth";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import RiderDashboard from "./components/RidersDashboard/RiderDashboard";

function App() {

  const PrivateRoute = ({ element }) => {
    const { currentUser } = useAuth();
    return currentUser ? element : <Navigate to="/login" />;
  };

  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/*" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path="/riders/*" element={<PrivateRoute element={<RiderDashboard />} />} />
      </Routes>
    </div>
  );
}

export default App;

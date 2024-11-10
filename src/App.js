import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import LandingPage from "./components/LandingPage";
import { useAuth } from "./hooks/useAuth";
import UpdateOrder from "./components/UpdateOrder/UpdateOrder";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";

function App() {

  const PrivateRoute = ({element}) => {
    const {currentUser} = useAuth();
    return currentUser ? element : <Navigate to="/login" />
  }

  return (
    <div className="">
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<PrivateRoute element={<LandingPage />} />}></Route>
        <Route path="/order/:id/update-order" element={<PrivateRoute element={<UpdateOrder />} />}></Route>
        <Route
          path="/admin/*"
          element={<AdminDashboard />}
        />
      </Routes>
    </div>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Test from "./components/Test";

function App() {

  return (
 <Router> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<Test />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

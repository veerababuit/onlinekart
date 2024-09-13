import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            <Route
              path="/admin"
              element={user?.isAdmin ? <AdminDashboard /> : <Redirect to="/" />}
            />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;

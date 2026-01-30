import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import { auth } from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getMe()
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem("token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {user && <Navbar user={user} onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/feed" /> : <Login setUser={setUser} />}
        />
        <Route
          path="/register"
          element={
            user ? <Navigate to="/feed" /> : <Register setUser={setUser} />
          }
        />
        <Route
          path="/feed"
          element={user ? <Feed user={user} /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile/:id"
          element={
            user ? <Profile currentUser={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/search"
          element={
            user ? <Search currentUser={user} /> : <Navigate to="/login" />
          }
        />
        <Route path="/" element={<Navigate to={user ? "/feed" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

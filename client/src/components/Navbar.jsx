import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Search, User, LogOut } from "lucide-react";

function Navbar({ user, onLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">SocialApp</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/feed"
            className={`p-2 rounded-full transition-all ${
              isActive("/feed")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Feed"
          >
            <Home size={22} />
          </Link>
          <Link
            to="/search"
            className={`p-2 rounded-full transition-all ${
              isActive("/search")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Search"
          >
            <Search size={22} />
          </Link>
          <Link
            to={`/profile/${user._id}`}
            className={`p-2 rounded-full transition-all ${
              location.pathname.startsWith("/profile")
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title="Profile"
          >
            <User size={22} />
          </Link>
          <button
            onClick={onLogout}
            className="p-2 rounded-full text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
            title="Logout"
          >
            <LogOut size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

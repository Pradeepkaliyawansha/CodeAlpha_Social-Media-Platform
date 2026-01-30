import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search as SearchIcon, UserPlus, UserCheck, X } from "lucide-react";
import { users } from "../services/api";

function Search({ currentUser }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [following, setFollowing] = useState({});
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const res = await users.search(query);
      setResults(res.data.users);

      // Build following map
      const followingMap = {};
      res.data.users.forEach((user) => {
        followingMap[user._id] = user.followers.includes(currentUser._id);
      });
      setFollowing(followingMap);
    } catch (err) {
      console.error("Error searching users:", err);
      alert("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await users.follow(userId);
      setFollowing({ ...following, [userId]: !following[userId] });

      // Update the results to reflect the change
      setResults(
        results.map((user) => {
          if (user._id === userId) {
            return {
              ...user,
              followers: following[userId]
                ? user.followers.filter((id) => id !== currentUser._id)
                : [...user.followers, currentUser._id],
            };
          }
          return user;
        }),
      );
    } catch (err) {
      console.error("Error following user:", err);
      alert("Failed to follow user");
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setSearched(false);
  };

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4 pb-8">
      {/* Search Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Users</h1>
        <p className="text-gray-600">Find and connect with other users</p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <SearchIcon
            className="absolute left-4 top-4 text-gray-400"
            size={20}
          />
          <input
            type="text"
            className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            placeholder="Search by username or name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={!query.trim() || loading}
          className="w-full mt-3 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Search Results */}
      <div>
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-600">Searching...</div>
          </div>
        ) : searched && results.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <SearchIcon className="mx-auto mb-3 text-gray-400" size={48} />
            <p className="text-gray-600">No users found matching "{query}"</p>
            <p className="text-gray-500 text-sm mt-2">
              Try searching with a different name or username
            </p>
          </div>
        ) : results.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              Found {results.length} {results.length === 1 ? "user" : "users"}
            </div>
            <div className="space-y-3">
              {results.map((user) => (
                <div
                  key={user._id}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="flex items-center flex-1 cursor-pointer"
                      onClick={() => navigate(`/profile/${user._id}`)}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                        {user.name[0].toUpperCase()}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="font-semibold text-gray-900 text-lg">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          @{user.username}
                        </div>
                        {user.bio && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {user.bio}
                          </p>
                        )}
                      </div>
                    </div>

                    {currentUser._id !== user._id && (
                      <button
                        onClick={() => handleFollow(user._id)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition-all flex-shrink-0 ml-4 ${
                          following[user._id]
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {following[user._id] ? (
                          <>
                            <UserCheck size={18} />
                            Following
                          </>
                        ) : (
                          <>
                            <UserPlus size={18} />
                            Follow
                          </>
                        )}
                      </button>
                    )}

                    {currentUser._id === user._id && (
                      <span className="text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-lg font-medium">
                        You
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <SearchIcon className="mx-auto mb-3 text-gray-400" size={48} />
            <p className="text-gray-600">Start searching to find users</p>
            <p className="text-gray-500 text-sm mt-2">
              Enter a name or username above
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

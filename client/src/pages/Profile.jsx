import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  UserPlus,
  UserCheck,
  Users,
  UserCircle,
  ArrowLeft,
} from "lucide-react";
import { users } from "../services/api";

function Profile({ currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [id]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await users.getProfile(id);
      setProfile(res.data.user);
      setIsFollowing(
        res.data.user.followers.some((f) => f._id === currentUser._id),
      );
    } catch (err) {
      console.error("Error loading profile:", err);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      await users.follow(id);
      setIsFollowing(!isFollowing);
      loadProfile();
    } catch (err) {
      console.error("Error following user:", err);
      alert("Failed to follow user");
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto pt-20 px-4 pb-8 text-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto pt-20 px-4 pb-8 text-center">
        <div className="text-gray-600">Profile not found</div>
      </div>
    );
  }

  const isOwnProfile = currentUser._id === id;

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4 pb-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

        {/* Profile Info */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex items-end justify-between -mt-16 mb-4">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-5xl border-4 border-white shadow-lg">
              {profile.name[0].toUpperCase()}
            </div>

            {/* Follow Button */}
            {!isOwnProfile && (
              <button
                onClick={handleFollow}
                disabled={followLoading}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                  isFollowing
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck size={20} />
                    Following
                  </>
                ) : (
                  <>
                    <UserPlus size={20} />
                    Follow
                  </>
                )}
              </button>
            )}
          </div>

          {/* Name and Username */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-900">{profile.name}</h2>
            <p className="text-gray-600 text-lg">@{profile.username}</p>
            {isOwnProfile && (
              <span className="inline-block mt-1 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Your Profile
              </span>
            )}
          </div>

          {/* Bio */}
          {profile.bio ? (
            <p className="text-gray-700 mb-4 leading-relaxed">{profile.bio}</p>
          ) : (
            <p className="text-gray-400 italic mb-4">No bio yet</p>
          )}

          {/* Stats */}
          <div className="flex gap-8 py-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-gray-500" />
              <div>
                <span className="font-bold text-xl text-gray-900">
                  {profile.followers.length}
                </span>
                <span className="text-gray-600 ml-1">
                  {profile.followers.length === 1 ? "Follower" : "Followers"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <UserCircle size={20} className="text-gray-500" />
              <div>
                <span className="font-bold text-xl text-gray-900">
                  {profile.following.length}
                </span>
                <span className="text-gray-600 ml-1">Following</span>
              </div>
            </div>
          </div>

          {/* Followers/Following Lists */}
          {(profile.followers.length > 0 || profile.following.length > 0) && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              {/* Followers */}
              {profile.followers.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Followers
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.followers.map((follower) => (
                      <button
                        key={follower._id}
                        onClick={() => navigate(`/profile/${follower._id}`)}
                        className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 transition-colors"
                      >
                        @{follower.username}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Following */}
              {profile.following.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Following
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.following.map((following) => (
                      <button
                        key={following._id}
                        onClick={() => navigate(`/profile/${following._id}`)}
                        className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-full text-sm text-blue-700 transition-colors"
                      >
                        @{following.username}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <h3 className="font-semibold text-gray-900 mb-3">
          Account Information
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="text-gray-900">{profile.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Joined:</span>
            <span className="text-gray-900">
              {new Date(profile.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

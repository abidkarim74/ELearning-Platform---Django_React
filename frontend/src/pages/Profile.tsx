import { useEffect, useState } from "react";
import { getRequest } from "../requests/requests";
import { useAuth } from "../context/AuthProvider";
import type { StudentProfile } from "../interfaces/ProfileInterface";
import LeftProfileBar from "../components/profile/LeftProfileBar";
import RightProfileBar from "../components/profile/RightProfileBar";


const Profile = () => {
  const { accessToken } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getRequest('/profiles/student');
      setStudentProfile(response.data);
    } catch (err: any) {
      console.log(err.message);
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchProfile();
    }
  }, [accessToken]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-full animate-pulse mb-4"></div>
                  <div className="h-6 w-48 bg-gray-300 rounded-lg animate-pulse mb-2"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
                </div>
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Failed to Load Profile</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchProfile}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <LeftProfileBar studentProfile={studentProfile} />
          </div>

           <div className="lg:col-span-2">
            <RightProfileBar studentProfile={studentProfile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
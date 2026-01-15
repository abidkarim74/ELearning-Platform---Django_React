import type { StudentProfile } from "../../interfaces/ProfileInterface";

interface LeftProfileBarProps {
  studentProfile: StudentProfile | null;
}


const LeftProfileBar = ({ studentProfile }: LeftProfileBarProps) => {
  return ( 
    <div className="sticky top-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with gradient */}
        <div className="relative h-32 bg-gradient-to-r from-blue-600 to-cyan-500">
          <div className="absolute inset-0 bg-grid-white opacity-10"></div>
        </div>
        
        {/* Profile Content */}
        <div className="relative px-6 pb-8">
          {/* Profile Picture */}
          <div className="relative -mt-16 mb-4">
            <div className="relative w-32 h-32 mx-auto">
              {/* Gradient border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-sm opacity-30"></div>
              
              {/* Profile picture or placeholder */}
              {studentProfile?.user.profile_pic ? (
                <img
                  src={studentProfile.user.profile_pic}
                  alt={studentProfile.user.first_name}
                  className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600">
                    {studentProfile?.user.first_name?.charAt(0)}{studentProfile?.user.last_name?.charAt(0)}
                  </span>
                </div>
              )}
              
              {/* Online status indicator */}
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
            </div>
          </div>

          {/* User Info */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {studentProfile?.user.first_name} {studentProfile?.user.last_name}
            </h2>
            <p className="text-gray-600 mb-4">@{studentProfile?.user.username}</p>
          </div>

          {/* User ID Badge */}
          

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">12</div>
              <div className="text-xs text-gray-600">Courses</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">45h</div>
              <div className="text-xs text-gray-600">Hours</div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">85%</div>
              <div className="text-xs text-gray-600">Progress</div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-cyan-400 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftProfileBar;
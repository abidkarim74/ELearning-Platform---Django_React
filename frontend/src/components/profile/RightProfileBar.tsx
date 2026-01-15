import type { StudentProfile } from "../../interfaces/ProfileInterface";

interface RightProfileBarProps {
  studentProfile: StudentProfile | null;
}

const RightProfileBar = ({ studentProfile }: RightProfileBarProps) => {
  return (
    <div className="space-y-6 h-full">
      {/* Personal Information Card */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
          <div className="px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            Student
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Basic Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
              <div className="flex items-center p-2.5 bg-gray-50 rounded-lg">
                <svg className="w-4 h-4 text-gray-400 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium text-gray-900 text-sm">
                  {studentProfile?.user.first_name} {studentProfile?.user.last_name}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Username</label>
              <div className="flex items-center p-2.5 bg-gray-50 rounded-lg">
                <svg className="w-4 h-4 text-gray-400 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <span className="font-medium text-gray-900 text-sm">@{studentProfile?.user.username}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Gender</label>
              <div className="flex items-center p-2.5 bg-gray-50 rounded-lg">
                <svg className="w-4 h-4 text-gray-400 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium text-gray-900 text-sm capitalize">
                  {studentProfile?.gender || "Not specified"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Account Status</label>
              <div className="flex items-center p-2.5 bg-emerald-50 rounded-lg">
                <svg className="w-4 h-4 text-emerald-500 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-emerald-700 text-sm">Active</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Member Since</label>
              <div className="flex items-center p-2.5 bg-gray-50 rounded-lg">
                <svg className="w-4 h-4 text-gray-400 mr-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-gray-900 text-sm">2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills/Interests Card */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Skills & Interests</h3>
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full text-xs font-medium">
            Web Development
          </span>
          <span className="px-2 py-1 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-full text-xs font-medium">
            React
          </span>
          <span className="px-2 py-1 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-full text-xs font-medium">
            TypeScript
          </span>
          <span className="px-2 py-1 bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
            UI/UX Design
          </span>
          <span className="px-2 py-1 bg-gradient-to-r from-red-50 to-red-100 text-red-700 rounded-full text-xs font-medium">
            Backend Development
          </span>
          <button className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors">
            + Add More
          </button>
        </div>
      </div>

      {/* Additional Content Sections */}
      <div className="bg-white rounded-xl shadow-lg p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Completed React Module {item}</p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Learning Goals</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">Web Development Course</span>
              <span className="text-xs font-medium text-gray-900">75%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">3 React Projects</span>
              <span className="text-xs font-medium text-gray-900">33%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" style={{ width: '33%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-xs font-medium text-gray-700">TypeScript Advanced</span>
              <span className="text-xs font-medium text-gray-900">20%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" style={{ width: '20%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for other-user-stuff */}
      <div className="other-user-stuff bg-white rounded-xl shadow-lg p-5">
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1.5">More Features Coming Soon</h3>
          <p className="text-xs text-gray-600 max-w-md mx-auto">
            Additional user information and settings will be displayed here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightProfileBar;
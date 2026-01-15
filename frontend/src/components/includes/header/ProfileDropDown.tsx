import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, User, BookOpen, Award, Settings, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthProvider';


interface ProfileDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
}


const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onToggle }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {user, logout } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      onToggle(); 
      setLoading(false);
      navigate('/login'); 
    } catch (error) {
      setLoading(false);
    }
  };

  const profileOptions = [
    { icon: <User size={18} />, label: 'My Profile', href: '/profile', type: 'link' },
    { icon: <BookOpen size={18} />, label: 'My Courses', href: '/my-courses', type: 'link' },
    { icon: <Award size={18} />, label: 'Achievements', href: '/achievements', type: 'link' },
    { icon: <Settings size={18} />, label: 'Settings', href: '/settings', type: 'link' },
    { icon: <LogOut size={18} />, label: 'Logout', href: '#', type: 'button' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggle]);

  const handleOptionClick = (option: typeof profileOptions[0]) => {
    if (option.type === 'button') {
      handleLogout();
    } else {
      console.log(`${option.label} clicked - navigating to ${option.href}`);
      onToggle();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* PROFILE BUTTON */}
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
      >
        <div className="relative">
          <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              alt="User profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-400 rounded-full border-2 border-white"></div>
        </div>

        <div className="hidden md:block text-left">
          <p className="text-sm font-semibold text-gray-900">{user?.first_name} {user?.last_name}</p>
          <p className="text-xs text-gray-500">Student</p>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          className="
            fixed inset-x-0 top-16
            md:absolute md:inset-auto md:right-0 md:top-full
            mt-2 md:mt-2
            w-full md:w-72
            bg-white
            rounded-none md:rounded-xl
            border border-gray-200
            shadow-xl
            py-2
            animate-fadeIn
            z-50
          "
        >
          {/* HEADER - Clickable to profile */}
          <Link 
            to="/profile" 
            onClick={() => handleOptionClick(profileOptions[0])}
            className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                  alt="User profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user?.first_name} {user?.last_name}</h3>
                <p className="text-sm text-gray-500">@{user?.username}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full">
                  Premium Plan
                </span>
              </div>
            </div>
          </Link>

          {/* STATS - Possibly clickable to progress/analytics */}
          <Link 
            to="/progress" 
            onClick={() => console.log('Progress Stats clicked')}
            className="block px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">12</div>
                <div className="text-xs text-gray-500">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">42</div>
                <div className="text-xs text-gray-500">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">85%</div>
                <div className="text-xs text-gray-500">Progress</div>
              </div>
            </div>
          </Link>

          {/* OPTIONS */}
          <div className="py-2">
            {profileOptions.map((option, index) => (
              option.type === 'link' ? (
                <Link
                  key={index}
                  to={option.href}
                  onClick={() => handleOptionClick(option)}
                  className="w-full px-4 py-2.5 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors group"
                >
                  <div className="text-gray-500 group-hover:text-indigo-500 transition-colors">
                    {option.icon}
                  </div>
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {option.label}
                  </span>
                </Link>
              ) : (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  disabled={loading}
                  className="w-full px-4 py-2.5 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="text-gray-500 group-hover:text-red-500 transition-colors">
                    {loading ? (
                      <Loader2 className="h-4.5 w-4.5 animate-spin text-red-500" />
                    ) : (
                      option.icon
                    )}
                  </div>
                  <span className="text-sm text-gray-700 group-hover:text-red-600">
                    {loading ? 'Logging out...' : option.label}
                  </span>
                </button>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
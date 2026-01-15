import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown, Home, Book, Video, Users, Award,
  BarChart, Calendar, Download, HelpCircle, FileText
} from 'lucide-react';

const NavigationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { icon: <Home className="w-3.5 h-3.5" />, label: 'Dashboard', href: '/dashboard', color: 'bg-blue-100 text-blue-600' },
    { icon: <Book className="w-3.5 h-3.5" />, label: 'Courses', href: '/courses', badge: '12', color: 'bg-purple-100 text-purple-600' },
    { icon: <Video className="w-3.5 h-3.5" />, label: 'Live Classes', href: '/live', color: 'bg-red-100 text-red-600' },
    { icon: <Users className="w-3.5 h-3.5" />, label: 'Community', href: '/community', color: 'bg-green-100 text-green-600' },
    { icon: <Award className="w-3.5 h-3.5" />, label: 'Certifications', href: '/certifications', badge: '3', color: 'bg-yellow-100 text-yellow-600' },
    { icon: <BarChart className="w-3.5 h-3.5" />, label: 'Progress', href: '/progress', color: 'bg-indigo-100 text-indigo-600' },
    { icon: <Calendar className="w-3.5 h-3.5" />, label: 'Schedule', href: '/schedule', color: 'bg-teal-100 text-teal-600' },
    { icon: <FileText className="w-3.5 h-3.5" />, label: 'Assignments', href: '/assignments', color: 'bg-gray-100 text-gray-600' },
    { icon: <Download className="w-3.5 h-3.5" />, label: 'Resources', href: '/resources', color: 'bg-violet-100 text-violet-600' }
  
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus trap for accessibility
      const focusableElements = contentRef.current?.querySelectorAll('a[href], button');
      if (focusableElements && focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    setIsOpen(true);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeDropdown = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
    }, 200);
  };

  const handleNavClick = () => {
    closeDropdown();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button with Animation */}
      <button
        onClick={toggleDropdown}
        className={`
          flex items-center justify-center p-1 sm:p-2 bg-white rounded-lg border shadow-sm
          transition-all duration-300 ease-out
          min-w-[34px] min-h-[34px]
          ${isOpen 
            ? 'border-blue-400 shadow-md bg-blue-50' 
            : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
          }
          ${isAnimating ? 'transform scale-95' : 'transform scale-100'}
        `}
        aria-label="Navigation menu"
        aria-expanded={isOpen}
      >
        <div className="flex flex-col items-center transition-all duration-300">
          {/* Animated Hamburger Icon */}
          <div className="relative w-3.5 h-3.5">
            <div className={`
              absolute top-0 left-0 w-full h-0.5 bg-gray-700 rounded-full
              transition-all duration-300 ease-out
              ${isOpen ? 'transform rotate-45 translate-y-1.5' : ''}
            `} />
            <div className={`
              absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 rounded-full
              transition-all duration-300 ease-out
              ${isOpen ? 'opacity-0' : 'opacity-100'}
            `} />
            <div className={`
              absolute bottom-0 left-0 w-full h-0.5 bg-gray-700 rounded-full
              transition-all duration-300 ease-out
              ${isOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}
            `} />
          </div>
          <span className={`
            hidden sm:block text-[8px] font-medium mt-0.5
            transition-colors duration-300
            ${isOpen ? 'text-blue-600' : 'text-gray-500'}
          `}>
            Menu
          </span>
        </div>
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 sm:hidden z-40 animate-fadeIn"
          onClick={closeDropdown}
        />
      )}

      {/* Dropdown Menu */}
      <div 
        ref={contentRef}
        className={`
          fixed inset-x-0 top-14 sm:absolute sm:top-full sm:left-0 sm:mt-2 sm:w-64
          bg-white rounded-lg sm:rounded-xl shadow-xl border border-gray-100 py-1.5
          z-50 max-h-[calc(100vh-80px)] overflow-y-auto
          transition-all duration-300 ease-out
          ${isOpen 
            ? 'opacity-100 translate-y-0 scale-100' 
            : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'
          }
          ${isOpen ? 'animate-slideDown' : ''}
        `}
        style={{
          transformOrigin: 'top left',
        }}
      >
        {/* Header with Animation */}
        <div className="px-3 py-2.5 border-b border-gray-100">
          <div className="flex items-center justify-between animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Navigation</h3>
              <p className="text-xs text-gray-600 mt-0.5">Explore all sections</p>
            </div>
            <div className="px-2 py-1 bg-blue-50 rounded-md animate-pulse-subtle">
              <span className="text-xs font-semibold text-blue-600">{navLinks.length}</span>
            </div>
          </div>
        </div>

        {/* Navigation Links with Staggered Animation */}
        <div className="py-1">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              onClick={handleNavClick}
              className={`
                flex items-center justify-between px-3 py-2
                hover:bg-gray-50 active:bg-gray-100
                transition-all duration-200 ease-out
                group animate-fadeInUp
                ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              `}
              style={{
                animationDelay: `${0.05 * (index + 1)}s`,
                transitionDelay: `${0.02 * index}s`,
              }}
            >
              <div className="flex items-center space-x-2.5">
                <div className={`
                  p-1.5 rounded-md ${link.color}
                  transition-all duration-300 ease-out
                  group-hover:scale-110 group-hover:shadow-sm
                  group-active:scale-105
                `}>
                  {link.icon}
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {link.label}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1.5">
                {link.badge && (
                  <span className="
                    px-1.5 py-0.5 text-xs font-semibold 
                    bg-blue-600 text-white rounded-full 
                    min-w-[20px] text-center
                    transition-all duration-300 ease-out
                    group-hover:scale-110 group-hover:bg-blue-700
                    animate-bounce-subtle
                  ">
                    {link.badge}
                  </span>
                )}
                <ChevronDown className="
                  w-3 h-3 text-gray-300 transform -rotate-90
                  transition-all duration-300 ease-out
                  group-hover:text-blue-500 group-hover:translate-x-0.5
                " />
              </div>
            </Link>
          ))}
        </div>

        {/* Footer with Animation */}
        <div className="
          px-3 py-2 border-t border-gray-100 
          bg-gradient-to-r from-gray-50 to-blue-50/50
          rounded-b-lg sm:rounded-b-xl
          animate-fadeInUp
        " style={{ animationDelay: '0.6s' }}>
          <Link
            to="/all-courses"
            onClick={handleNavClick}
            className="
              flex items-center justify-center w-full py-2
              text-sm font-medium text-blue-700
              hover:text-blue-800 hover:bg-white
              transition-all duration-300 ease-out
              rounded-md border border-blue-100/50
              hover:border-blue-200 hover:shadow-sm
              active:scale-95
              group
            "
          >
            <span>View All Features</span>
            <ChevronDown className="
              w-3 h-3 ml-1.5 transform -rotate-90
              transition-transform duration-300 ease-out
              group-hover:translate-x-1
            " />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-10px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out forwards;
          opacity: 0;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 0.5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default NavigationDropdown;
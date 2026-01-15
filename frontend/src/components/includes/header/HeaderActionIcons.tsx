import React from 'react';

interface ActionIconsProps {
  notifications: number;
  unreadMessages: number;
  onNotificationClick: () => void;
  onMessageClick: () => void;
  onSearchClick: () => void;
  onAIClick: () => void;
  isDarkMode?: boolean;
  onDarkModeToggle?: () => void;
}

const ActionIcons: React.FC<ActionIconsProps> = ({
  notifications,
  unreadMessages,
  onNotificationClick,
  onMessageClick,
  onSearchClick,
  onAIClick,
}) => {
  return (
    <div className="flex items-center space-x-3 sm:space-x-4">
      {/* Search Icon - ONLY VISIBLE on small screens */}
      <button
        onClick={onSearchClick}
        className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors lg:hidden"
        aria-label="Search"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* AI Assistant Icon */}
      <button
        onClick={onAIClick}
        className="p-1.5 sm:p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors relative group"
        aria-label="AI Assistant"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center border border-white shadow-sm group-hover:scale-110 transition-transform">
          AI
        </span>
      </button>

      {/* Messages Icon */}
      <button
        onClick={onMessageClick}
        className="relative p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        aria-label="Messages"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {unreadMessages > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-medium rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center">
            {unreadMessages}
          </span>
        )}
      </button>

      {/* Notifications Icon */}
      <button
        onClick={onNotificationClick}
        className="relative p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {notifications > 0 && (
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-medium rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center">
            {notifications > 9 ? '9+' : notifications}
          </span>
        )}
      </button>
    </div>
  );
};

export default ActionIcons;
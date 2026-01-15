import React, { useState } from 'react';
import SearchBar from './includes/header/SearchBar';
import Logo from './includes/header/HeaderLogo';
import NavigationDropdown from './includes/header/NavigationDropDown';
import ProfileDropdown from './includes/header/ProfileDropDown';
import ActionIcons from './includes/header/HeaderActionIcons';


const TopHeader: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [unreadMessages, setUnreadMessages] = useState(2);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleAIClick = () => {
    console.log('AI Assistant clicked');
    // Add your AI assistant logic here
  };

  const handleNotificationClick = () => {
    setNotifications(0);
  };

  const handleMessageClick = () => {
    setUnreadMessages(0);
  };

  const handleSearchClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            
            {/* Left Section: Logo & Navigation Dropdown */}
            {/* On small screens: Just Navigation Dropdown with full left space */}
            {/* On medium+ screens: Logo + Navigation Dropdown */}
            <div className="flex items-center flex-1 sm:flex-initial space-x-0 sm:space-x-4">
              {/* Show NavigationDropdown on all screens, takes more space on small screens */}
              <div className="flex-1 sm:flex-initial">
                <div className="md:hidden w-full">
                  <NavigationDropdown />
                </div>
                <div className="hidden md:block">
                  <NavigationDropdown />
                </div>
              </div>
              
              {/* Show logo only on medium+ screens */}
              <div className="hidden sm:block ml-2 sm:ml-0">
                <Logo />
              </div>
            </div>

            {/* Center Section: Desktop Search Bar (only visible on 1024px+ screens) */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-6">
              <SearchBar />
            </div>

            {/* Right Section: Action Icons & Profile */}
            <div className="flex items-center justify-end flex-1 sm:flex-initial space-x-2">
              {/* Action Icons - Will have search icon hidden on desktop */}
              <div className="flex items-center">
                <ActionIcons
                  notifications={notifications}
                  unreadMessages={unreadMessages}
                  onNotificationClick={handleNotificationClick}
                  onMessageClick={handleMessageClick}
                  onSearchClick={handleSearchClick}
                  onAIClick={handleAIClick}
                />
              </div>

              <ProfileDropdown
                isOpen={isProfileOpen}
                onToggle={toggleProfile}
              />
            </div>
          </div>

          {/* Mobile Search Overlay (Full screen when search icon is clicked) */}
          {isSearchVisible && (
            <div className="lg:hidden fixed inset-0 z-50 bg-white">
              <SearchBar
                isMobile
                onCloseMobile={() => setIsSearchVisible(false)}
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default TopHeader;
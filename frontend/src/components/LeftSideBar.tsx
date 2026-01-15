import React, { useState } from 'react';
import { 
  Users, 
  Trophy, 
  MessageSquare, 
  Bookmark, 
  Download,
  FileText,
  Settings,
  Heart,
  Share2,
  Zap,
  Star,
  TrendingUp,
  Coffee,
  Music,
  Gamepad2,
  Camera,
  Palette,
  Globe,
  Lock,
  UserPlus,
  BellRing
} from 'lucide-react';

const SideHeader = () => {
  const [activeSection, setActiveSection] = useState('study-groups');
  
  // Different data - focused on social and community features
  const studyGroups = [
    { id: 1, name: 'React Masters', members: 24, active: true, topic: 'Web Dev' },
    { id: 2, name: 'Data Science Club', members: 18, active: true, topic: 'AI/ML' },
    { id: 3, name: 'Design Thinkers', members: 12, active: false, topic: 'UI/UX' },
    { id: 4, name: 'Language Learners', members: 32, active: true, topic: 'Languages' },
  ];

  const leaderboard = [
    { id: 1, name: 'Emma Wilson', points: 2450, change: '+2', avatarColor: 'bg-pink-500' },
    { id: 2, name: 'You', points: 1980, change: '+3', avatarColor: 'bg-blue-500' },
    { id: 3, name: 'Alex Chen', points: 1875, change: '-1', avatarColor: 'bg-green-500' },
    { id: 4, name: 'Sarah Miller', points: 1650, change: '+5', avatarColor: 'bg-purple-500' },
  ];

  const recentAchievements = [
    { id: 1, title: 'Perfect Week', description: '7-day learning streak', icon: <Zap className="h-5 w-5" />, color: 'text-yellow-500' },
    { id: 2, title: 'Social Butterfly', description: 'Joined 5 study groups', icon: <Users className="h-5 w-5" />, color: 'text-pink-500' },
    { id: 3, title: 'Helper', description: 'Answered 20 questions', icon: <MessageSquare className="h-5 w-5" />, color: 'text-green-500' },
  ];

  const resourceCategories = [
    { id: 1, name: 'Video Lectures', count: 42, icon: <Camera className="h-4 w-4" /> },
    { id: 2, name: 'PDF Notes', count: 28, icon: <FileText className="h-4 w-4" /> },
    { id: 3, name: 'Cheat Sheets', count: 15, icon: <Bookmark className="h-4 w-4" /> },
    { id: 4, name: 'Templates', count: 9, icon: <Palette className="h-4 w-4" /> },
  ];

  return (
    <aside className="h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col w-72">
      {/* Header with user status */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-lg font-bold">AJ</span>
            </div>
            <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
          </div>
          <div>
            <h2 className="text-lg font-bold">Alex Johnson</h2>
            <div className="flex items-center text-sm text-gray-300">
              <Coffee className="h-3 w-3 mr-1" />
              <span>Study Mode: Active</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="text-xl font-bold text-purple-400">8</div>
            <div className="text-xs text-gray-400">Groups</div>
          </div>
          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="text-xl font-bold text-yellow-400">12</div>
            <div className="text-xs text-gray-400">Friends</div>
          </div>
          <div className="text-center p-3 bg-gray-800 rounded-lg">
            <div className="text-xl font-bold text-blue-400">24</div>
            <div className="text-xs text-gray-400">Badges</div>
          </div>
        </div>

        <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:opacity-90 transition-opacity">
          <UserPlus className="h-4 w-4" />
          <span className="font-medium">Invite Friends</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-6">
          {/* Section 1: Study Groups */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Study Groups</h3>
              <button className="text-xs text-purple-400 hover:text-purple-300">See All</button>
            </div>
            <div className="space-y-3">
              {studyGroups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full mr-3 ${group.active ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                    <div>
                      <div className="font-medium">{group.name}</div>
                      <div className="text-xs text-gray-400">{group.members} members • {group.topic}</div>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-600 rounded">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Leaderboard */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
              <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
              Leaderboard
            </h3>
            <div className="space-y-3">
              {leaderboard.map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${user.name === 'You' ? 'bg-purple-900/30 border border-purple-700' : 'bg-gray-800'}`}
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-700 mr-3">
                      {index === 0 && <Star className="h-4 w-4 text-yellow-500" />}
                      {index === 1 && <TrendingUp className="h-4 w-4 text-blue-400" />}
                      {index === 2 && <span className="text-sm font-bold">3</span>}
                      {index === 3 && <span className="text-sm">4</span>}
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-400">{user.points} pts</div>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${user.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                    {user.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Achievements */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Recent Achievements</h3>
            <div className="grid grid-cols-1 gap-3">
              {recentAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-center p-3 bg-gray-800 rounded-lg"
                >
                  <div className={`p-2 rounded-lg bg-gray-900 ${achievement.color} mr-3`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <div className="font-medium">{achievement.title}</div>
                    <div className="text-xs text-gray-400">{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Resource Library */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center">
              <Download className="h-4 w-4 mr-2 text-blue-400" />
              Resource Library
            </h3>
            <div className="space-y-2">
              {resourceCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center">
                    <div className="p-1.5 rounded bg-gray-900 mr-3">
                      {category.icon}
                    </div>
                    <span className="text-sm">{category.name}</span>
                  </div>
                  <span className="text-xs bg-gray-900 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Footer with actions */}
      <div className="p-6 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="flex flex-col items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <Heart className="h-5 w-5 text-pink-500 mb-1" />
            <span className="text-xs">Favorite</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <Share2 className="h-5 w-5 text-blue-400 mb-1" />
            <span className="text-xs">Share</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <Settings className="h-5 w-5 text-gray-400 mb-1" />
            <span className="text-xs">Settings</span>
          </button>
          <button className="flex flex-col items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <Lock className="h-5 w-5 text-green-400 mb-1" />
            <span className="text-xs">Private</span>
          </button>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">Online: 128</span>
          </div>
          <button className="text-purple-400 hover:text-purple-300 flex items-center">
            <BellRing className="h-4 w-4 mr-1" />
            <span>Mute</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideHeader;
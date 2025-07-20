import React, { useState } from 'react';
import { Menu, X, Cog, Zap, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './Auth/LoginModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    ...(isAdmin ? [{ name: 'Admin', href: '/admin' }] : []),
  ];

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Cog className="h-8 w-8 text-blue-600 animate-spin-slow" />
              <Zap className="h-6 w-6 text-orange-500" />
            </div>
            <span className="text-2xl font-bold text-gray-900">AMK</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

            {/* User Menu / Login */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">{user.email?.split('@')[0]}</span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      {isAdmin && (
                        <a
                          href="/admin"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/admin';
                          }}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Admin Panel</span>
                        </a>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Sign In
                </button>
              )}
            </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href.startsWith('/') ? item.href : item.href}
                  onClick={item.href.startsWith('/') ? (e) => {
                    e.preventDefault();
                    window.location.href = item.href;
                    setIsMenuOpen(false);
                  } : () => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile Auth */}
              <div className="border-t border-gray-200 pt-3 mt-3">
                {user ? (
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-gray-500 text-sm">
                      Signed in as {user.email?.split('@')[0]}
                    </div>
                    {isAdmin && (
                      <a
                        href="/admin"
                        className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = '/admin';
                          setIsMenuOpen(false);
                        }}
                      >
                        Admin Panel
                      </a>
                    )}
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsLoginModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-blue-600 font-medium"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default Header;
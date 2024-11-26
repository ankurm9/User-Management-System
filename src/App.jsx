import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Lock } from 'lucide-react';
import Layout from './components/layout/Layout';
import UserList from './components/users/UserList';
import RoleList from './components/roles/RoleList';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const SecurityMessage = ({ message, complete }) => (
  <div className="flex items-center space-x-2 sm:space-x-3 text-white">
    <div className={`transition-all duration-300 ${complete ? 'scale-100' : 'scale-0'}`}>
      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
    </div>
    <span className={`text-sm sm:text-lg ${complete ? 'opacity-100' : 'opacity-70'}`}>
      {message}
    </span>
  </div>
);

const SplashScreen = () => {
  const [securityChecks, setSecurityChecks] = useState([
    { message: 'Initializing security protocols...', complete: false },
    { message: 'Verifying system integrity...', complete: false },
    { message: 'Establishing secure connection...', complete: false },
    { message: 'Security checks complete', complete: false }
  ]);

  useEffect(() => {
    securityChecks.forEach((_, index) => {
      setTimeout(() => {
        setSecurityChecks(prev =>
          prev.map((check, i) => ({
            ...check,
            complete: i <= index
          }))
        );
      }, (index + 1) * 500);
    });
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-blue-700 flex flex-col items-center justify-center px-4">
      {/* Logo Animation */}
      <div className="mb-6 sm:mb-8 relative">
        <div className="absolute inset-0 animate-ping opacity-50">
          <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400" />
        </div>
        <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-white relative z-10 animate-pulse" />
      </div>

      <div className="text-white text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center animate-fadeIn">
        Welcome to SecureShield
      </div>

      <div className="flex flex-col items-center space-y-4 sm:space-y-8 w-full max-w-md px-4">
        {/* Security Messages */}
        <div className="space-y-2 sm:space-y-3 w-full">
          {securityChecks.map((check, index) => (
            <SecurityMessage
              key={index}
              message={check.message}
              complete={check.complete}
            />
          ))}
        </div>

        <div className="flex items-center space-x-2 w-full">
          <Lock className="w-4 h-4 sm:w-6 sm:h-5 text-white animate-pulse" />
          <div className="flex-grow h-1 bg-blue-300 rounded-full overflow-hidden">
            <div className="h-full bg-white animate-progressBar" />
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="relative">
          {loading ? (
            <SplashScreen />
          ) : (
            <div className="animate-fadeIn">
              <Layout>
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <div className="w-full md:w-1/2">
                      <UserList />
                    </div>
                    <div className="w-full md:w-1/2">
                      <RoleList />
                    </div>
                  </div>
                </div>
              </Layout>
            </div>
          )}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
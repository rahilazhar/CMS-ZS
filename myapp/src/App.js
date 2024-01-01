import React, { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import { CaseHistoryProvider } from './Context/CaseHistoryContext';
import { AuthProvider, useAuth } from './Context/AuthContext';
import LoginPage from './Screens/Auth/Login';
import { UserProvider } from './Context/Usercontext';
import Loader from './Components/Loaders/Loaderapp';
import Welcome from './Components/Welcome';

const App = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const userAlreadyVisited = localStorage.getItem('user');
  
    if (userAlreadyVisited !== 'true') {
      // Show the welcome screen
      const timer = setTimeout(() => {
        setShowWelcome(false);
        // Set 'user' key in local storage to true
        localStorage.setItem('user', 'true');
      }, 4000); // 4 seconds for welcome screen (you mentioned 3 seconds in comments but used 4 seconds)
  
      return () => clearTimeout(timer);
    } else {
      // User has already visited, so don't show the welcome screen
      setShowWelcome(false);
    }
  }, []);


  return (
    <>
      {showWelcome ? (
        <Welcome />
      ) : (
        <UserProvider>
          <AuthProvider>
            <MainComponent />
          </AuthProvider>
        </UserProvider>
      )}


    </>
  )
}

const MainComponent = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);


  const { authData } = useAuth();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <CaseHistoryProvider>
          {authData ? <Sidebar /> : <LoginPage />}
        </CaseHistoryProvider>
      )}
    </>


  );
};

export default App
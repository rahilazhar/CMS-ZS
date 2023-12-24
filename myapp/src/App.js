import React, { useState, useEffect } from 'react'
import Sidebar from './Components/Sidebar'
import { CaseHistoryProvider } from './Context/CaseHistoryContext';
import { AuthProvider, useAuth } from './Context/AuthContext';
import LoginPage from './Screens/Auth/Login';
import { UserProvider } from './Context/Usercontext';
import  Loader  from './Components/Loaders/Loaderapp';








const App = () => {


  return (
    <>
      <UserProvider>
        <AuthProvider>

          <MainComponent />

        </AuthProvider>
      </UserProvider>


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
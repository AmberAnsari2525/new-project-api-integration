import 'bootstrap/dist/css/bootstrap.min.css';
import { Errorpage } from './Pages/error';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider, AuthContext } from './Context/Authcontext';
import { Login } from './Pages/Log-in';
import { Signup } from './Pages/Sign-up';
import { Viewprofile } from './Pages/View-profile';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <div className="container mt-4">
            <Routes>
              <Route 
                path="/" 
                element={
                  <AuthContext.Consumer>
                    {({ preventAuthAccess }) => (
                      preventAuthAccess ? <Signup /> : <Signup />
                    )}
                  </AuthContext.Consumer>
                } 
              />
              <Route 
                path="/sign-up" 
                element={
                  <AuthContext.Consumer>
                    {({ preventAuthAccess }) => (
                      preventAuthAccess ? <Signup /> : <Signup />
                    )}
                  </AuthContext.Consumer>
                } 
              />
              <Route 
                path="/log-in" 
                element={
                  <AuthContext.Consumer>
                    {({ preventAuthAccess }) => (
                      preventAuthAccess ? <Login /> : <Login />
                    )}
                  </AuthContext.Consumer>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <AuthContext.Consumer>
                    {({ requireAuth }) => (
                      requireAuth ? <Viewprofile /> : <Login />
                    )}
                  </AuthContext.Consumer>
                } 
              />
              <Route path="*" element={<Errorpage />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;

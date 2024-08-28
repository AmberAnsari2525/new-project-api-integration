import 'bootstrap/dist/css/bootstrap.min.css';
import { Errorpage } from './Pages/error';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Log-in';
import { Signup } from './Pages/Sign-up';
import { Viewprofile } from './Pages/View-profile';
import { AuthProvider } from './Context/Authcontext';
import AuthContext from './Context/Authcontext';
import Navbar from './components/Navbar';
import { UpdateProfile} from './Pages/updateprofile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar/>

        <div className="container mt-4">
          <Routes>
            <Route path="/" element={
              <AuthContext.Consumer>
                {({ preventAuthAccess }) => preventAuthAccess(Signup)}
              </AuthContext.Consumer>
            } />
             <Route path="sign-up" element={
              <AuthContext.Consumer>
                {({ preventAuthAccess }) => preventAuthAccess(Signup)}
              </AuthContext.Consumer>
            } />
            <Route path="/log-in" element={
              <AuthContext.Consumer>
                {({ preventAuthAccess }) => preventAuthAccess(Login)}
              </AuthContext.Consumer>
            } />
            <Route path="/profile" element={
              <AuthContext.Consumer>
                {({ requireAuth }) => requireAuth(Viewprofile)}
              </AuthContext.Consumer>
            } />
            <Route path="/update" element={
              <AuthContext.Consumer>
                {({ requireAuth }) => requireAuth(UpdateProfile)}
              </AuthContext.Consumer>
            } />
            <Route path="*" element={<Errorpage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
   );
}

export default App;

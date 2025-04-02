import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

const ProtectedRoute = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setAuthReady(true);
      });
      return unsubscribe;
    }, []);
  
    if (!authReady) {
      return <LoadingSpinner />; // Show loading state
    }

    if (!user) {
        // Store the attempted location for redirect after login
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
      }

    if (user && !user.emailVerified) {
        return <Navigate to="/verify-email" replace />;
      }
  
    return user ? children : <Navigate to="/login" />;
  };

export default ProtectedRoute;
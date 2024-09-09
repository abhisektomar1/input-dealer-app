// AuthGuard.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';



const AuthGuard = () => {
//hiii
    const user = useAppSelector((state: any) => state.login.user)



  if (!user?.tokens?.access) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
//jii

// RootRedirect.js
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const RootRedirect = () => {
    const user = useAppSelector((state: any) => state.login.user)
    
  if (!user?.tokens?.access) {
    return <Navigate to="/dashboard/productList" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default RootRedirect;

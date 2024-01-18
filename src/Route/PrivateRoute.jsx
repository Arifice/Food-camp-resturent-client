import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({children}) => {
    const{user,loading}=useAuth();
    const location=useLocation();
    console.log('private route',{user},{loading});
    if(loading){
        return <progress className="progress w-56"></progress>
    }
    if(user){
        return children;
    }
    
    return <Navigate to={'/login'} state={{from:location}} replace></Navigate>
};

export default PrivateRoute;
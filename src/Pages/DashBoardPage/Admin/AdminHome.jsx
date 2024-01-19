
import useAuth from "../../../Hooks/useAuth";

const AdminHome = () => {
    const {user}=useAuth();
    return (
        <div className="text-center space-y-3">
            <span className="text-3xl font-Cinzel">Hi </span>
            {
                user &&  <h1 className="text-3xl text-orange-600 font-Cinzel">{user?.displayName}</h1>
               
            }
             <span className="text-3xl font-Cinzel">Welcome back</span>
        </div>
    );
};

export default AdminHome;
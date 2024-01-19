import useAuth from "../../Hooks/useAuth";

const UserHome = () => {
    const {user}=useAuth();
    return (
        <div className="text-center mt-20 font-extrabold space-y-3">
            <span className="text-3xl font-Cinzel">Hi </span>
            {
                user &&  <h1 className="text-3xl font-Cinzel text-purple-500">{user?.displayName}</h1> 
                
            }
            <span className="text-3xl font-Cinzel"> Welcome back</span>
        </div>
    );
};

export default UserHome;
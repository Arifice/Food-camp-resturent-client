import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";

const Navbar = () => {
    const {user,logOut}=useAuth();
    const [cart]=useCart();
    const [isAdmin]=useAdmin();

    const handleLogout=()=>{
        logOut()
            .then(result=>{
                console.log(result);
                Swal.fire({
                    title: "Good job!",
                    text: "You have successfully log out",
                    icon: "success"
                  });
            })
            .catch(error=>{
                console.log(error);
            })
    }
    const navLink=<>
        <li className="text-2xl"><NavLink to={'/'}>Home</NavLink></li>        
        <li className="text-2xl"><NavLink to={'/menu'}>Menu</NavLink></li>        
        <li className="text-2xl"><NavLink to={'/order/pizza'}>Order</NavLink></li> 
        <li className="text-2xl"><NavLink to={'/signup'}>Sign Up</NavLink></li>  

        {
            user && isAdmin && <li className="text-2xl"><NavLink to={'/dashboard/adminHome'}>Dash Board</NavLink></li>  
        }             
        {
            user && !isAdmin && <li className="text-2xl"><NavLink to={'/dashboard/userHome'}>Dash Board</NavLink></li>  
        }             
        
        <li className="text-2xl"><NavLink to={'/dashboard/cart'}>
                    <button className="btn">
                            <FaShoppingCart />    
                        <div className="badge badge-secondary">+{cart.length}</div>
                    </button>
            </NavLink></li>   
                    
        
        {
            user? 
                <li className="text-2xl"><button onClick={handleLogout}>log out</button></li>
            :
                <li className="text-2xl"><NavLink to={'/login'}>Login</NavLink></li>   
            
        }     
        
        
    
    </>
    return (
        <div className="navbar fixed z-10 bg-opacity-30  bg-black text-white text-3xl font-semibold font-Cinzel ">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52">
                    {navLink}
                </ul>
                </div>
                <a className="btn btn-ghost text-xl">Food Camp</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLink}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user? 
                    <>
                        <div className="flex justify-center items-center gap-5">
                            <h1>{user.displayName}</h1>
                            <img className="w-16 h-16 rounded-full" src={user.photoURL} alt="" />
                        </div>
                    </>
                    :undefined
                }
            </div>
        </div>
    );
};

export default Navbar;
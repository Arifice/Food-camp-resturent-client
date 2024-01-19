import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaBook, FaCalendar, FaCartPlus, FaHistory, FaHome, FaList, FaMailBulk,  FaShoppingBag,  FaUsers, FaUtensils, } from "react-icons/fa";
import useAdmin from "../Hooks/useAdmin";


const DashBoardLayout = () => {

    // TODO: get isAdmin value from the database
    // const [isAdmin]=useAdmin(true);
    // const isAdmin=true;
     const [isAdmin]=useAdmin();
    
    return (
        <div className="flex">
            {/* dash board side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu text-xl space-y-4 font-Cinzel">
                   {
                        isAdmin?
                        <>
                            <li><NavLink to={'/dashboard/adminHome'}> <FaHome></FaHome>Admin Home</NavLink></li>
                            <li><NavLink to={'/dashboard/addItems'}><FaUtensils></FaUtensils> Add Items</NavLink></li>
                            <li><NavLink to={'/dashboard/manageItems'} > <FaList></FaList>Manage Items</NavLink></li>
                            <li><NavLink to={'/dashboard/manageBookings'}><FaBook></FaBook>Manage Bookings</NavLink></li>
                            <li><NavLink to={'/dashboard/users'} > <FaUsers></FaUsers>All Users</NavLink></li>
                            
                        </>
                        :
                        <>
                            <li><NavLink to={'/dashboard/userHome'}> <FaHome></FaHome>User Home</NavLink></li>
                            <li><NavLink to={'/dashboard/reservation'}><FaCalendar></FaCalendar> Reservation</NavLink></li>
                            <li><NavLink to={'/dashboard/review'} > <FaAd></FaAd>Add Review</NavLink></li>
                            <li><NavLink to={'/dashboard/bookings'} > <FaBook></FaBook>My Bookings</NavLink></li>
                            
                            
                    
                        </>
                   }
                    {/* shaired Navlink */}
                    <hr className="boder-b-8 border-white  w-full"></hr>
                    
                    <li><NavLink to={'/'}> <FaHome></FaHome>Home</NavLink></li>
                    <li><NavLink to={'/menu'}> <FaList></FaList>Menu</NavLink></li>
                    <li><NavLink to={'/order/pizza'}><FaShoppingBag></FaShoppingBag> Order</NavLink></li>
                    <li><NavLink to={'/order/contact'}><FaMailBulk></FaMailBulk>Contact</NavLink></li>
                    <li><NavLink to={'/dashboard/cart'} > <FaCartPlus></FaCartPlus>My Cart</NavLink></li>
                    <li><NavLink to={'/dashboard/paymentHistory'} > <FaHistory></FaHistory>Payment History</NavLink></li>
                </ul>
            </div>
            {/* dash board content */}
            <div className="flex-1 max-w-7xl mx-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoardLayout;
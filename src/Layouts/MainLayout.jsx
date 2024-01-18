import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";


const MainLayout = () => {
    const location=useLocation();
    const noHeaderFooter=location.pathname.includes('/login') || location.pathname.includes('/signup')
    return (
        <div>
            {noHeaderFooter || <Navbar></Navbar>}
           <div  className='max-w-7xl mx-auto'>
                <Outlet></Outlet>
           </div>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;
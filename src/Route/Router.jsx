import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Error from "../Pages/ErrorPage/Error";
import Home from "../Pages/HomePage/Home";
import Menu from "../Pages/MenuPage/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import Cart from "../Pages/DashBoardPage/Cart";
import PrivateRoute from "./PrivateRoute";
import AllUsers from "../Pages/DashBoardPage/Admin/AllUsers";
import AddItem from "../Pages/DashBoardPage/Admin/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/DashBoardPage/Admin/ManageItems";
import UpdateItem from "../Pages/DashBoardPage/Admin/UpdateItem";
import Payment from "../Pages/DashBoardPage/Payment";






export const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<Error></Error>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/menu',
          element:<Menu></Menu>
        },
        {
          path:'/order/:category',
          element:<Order></Order>
        }, 
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        }   
        

      ]
    },
    {
      path:'/dashboard',
      element:<PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
      children:[
        // normal user
        {
          path:'cart',
          element:<Cart></Cart>
        },
        {
          path:'payment',
          element:<Payment></Payment>
        },

        // for admin
        {
          path:'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:'addItems',
          element:<AdminRoute><AddItem></AddItem></AdminRoute>          
        },
        {
          path:'manageItems',
          element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
        },
        {
          path:'updateItem/:id',
          element:<AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
          loader:({params})=>fetch(`http://localhost:5000/menu/${params.id}`)
        }
      ]
    }
  ]);

export default Router;
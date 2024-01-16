import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider} from "react-router-dom";
import "./index.css";
import Router from './Route/Router.jsx';
import { HelmetProvider } from 'react-helmet-async';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <HelmetProvider>
        <div>
            <RouterProvider router={Router} /> 
        </div>
       </HelmetProvider>
  </React.StrictMode>,
)

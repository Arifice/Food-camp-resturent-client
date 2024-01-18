import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider} from "react-router-dom";
import "./index.css";
import Router from './Route/Router.jsx';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Provider/AuthProvider.jsx';

import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <HelmetProvider>
                          <div>
                              <RouterProvider router={Router} /> 
                          </div>
            </HelmetProvider>  
          </QueryClientProvider>      
       </AuthProvider>
  </React.StrictMode>,
)

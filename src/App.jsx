import React, { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './css/style.css';

import Auth from './authRoutes/auth';

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change
  return (
    <Suspense fallback={<div>Loading......</div>}>
      <Auth />
    </Suspense>
  )
}

export default App;

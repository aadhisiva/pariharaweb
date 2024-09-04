import React, { Suspense, useEffect } from 'react';
import './css/style.css';

import AuthRoutes from './authRoutes/routes';

function App() {
  return (
    <Suspense fallback={<div>Loading......</div>}>
      <AuthRoutes />
    </Suspense>
  )
}

export default App;

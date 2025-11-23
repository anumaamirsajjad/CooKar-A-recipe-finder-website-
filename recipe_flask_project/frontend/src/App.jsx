// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import MainPage from './pages/mainpage'
// import RecipeFinder from './pages/recipespage'

// function App() {
//   return <RecipeFinder/>;

// }

// export default App;

// src/App.jsx
//...........................
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MainPage from './pages/mainpage';
// import RecipeFinder from './pages/RecipeFinder';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<MainPage />} />
//         <Route path="/recipes/:title" element={<RecipeFinder />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



//....................
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./pages/MainPage";       // ensure file name matches casing
import RecipeFinder from "./pages/RecipeFinder";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to /recipes */}
        <Route path="/" element={<Navigate to="/recipes" replace />} />

        {/* Main listing page */}
        <Route path="/recipes" element={<MainPage />} />

        {/* Recipe detail page */}
        <Route path="/recipes/:title" element={<RecipeFinder />} />
      </Routes>
    </Router>
  );
}

export default App;


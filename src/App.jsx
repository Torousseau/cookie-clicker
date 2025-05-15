import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CookieClicker from './pages/CookieClicker';
import HomePage from './pages/HomePage';
import TreePage from "./pages/TreePage.jsx";

function App() {
    return (
        <Router>
            <div id="root">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cookie-clicker" element={<CookieClicker />} />
                    <Route path="/tree" element={<TreePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
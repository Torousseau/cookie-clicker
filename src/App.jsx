import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CookieClickerPage from './pages/CookieClickerPage.jsx';
import HomePage from './pages/HomePage';
import TreePage from "./pages/TreePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

function App() {
    return (
        <Router>
            <div id="root">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/cookie-clicker" element={<CookieClickerPage />} />
                    <Route path="/tree" element={<TreePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
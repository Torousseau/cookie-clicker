import React, { useEffect, useState } from "react";
import "../assets/styles/WiiHomePage.css";
import {Settings, Cookie, User, TreeDeciduous} from "lucide-react";
import { useNavigate } from "react-router-dom";

const tiles = [
    { icon: <Cookie className="tile-icon" />, label: "Cookie Clicker", route: "/cookie-clicker" },
    { icon: <TreeDeciduous className="tile-icon" />, label: "Tree", route: "/tree" },
    { icon: <User className="tile-icon" />, label: "Profil" },
    { icon: <Settings className="tile-icon" />, label: "Paramètres" },
];

export default function WiiHomePage() {
    const [time, setTime] = useState(new Date());
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleTileClick = (tile, index) => {
        if (tile.route) {
            setSelectedIndex(index);
            setTimeout(() => {
                navigate(tile.route);
            }, 300); // Laisse le temps à l'animation de se jouer
        }
    };

    const formatTime = (date) => {
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${hours}:${minutes} ${ampm}`;
    };

    const formatDate = (date) => {
        return date.toLocaleDateString(undefined, {
            weekday: 'short',
            month: 'numeric',
            day: 'numeric'
        });
    };

    const gridItems = Array(12).fill(null).map((_, i) => (
        <div
            key={i}
            className={`tile-card ${selectedIndex === i ? "tile-zoom-out" : ""}`}
            onClick={() => tiles[i] && handleTileClick(tiles[i], i)}
        >
            {tiles[i] ? (
                <>
                    {tiles[i].icon}
                    <span className="tile-label">{tiles[i].label}</span>
                </>
            ) : null}
        </div>
    ));

    return (
        <div className="wii-wrapper dark-mode">
            <div className="tile-grid-full">
                {gridItems}
            </div>

            <div className="wii-footer">
                <button className="footer-btn">Wii</button>
                <div className="footer-center">
                    <div className="footer-time">{formatTime(time)}</div>
                    <div className="footer-date">{formatDate(time)}</div>
                </div>
                <button className="footer-btn">✉️</button>
            </div>
        </div>
    );
}

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import achievementsData from '../data/achievements.json';
import '../App.css';

function AchievementPage({ onClose, unlockedAchievements = {} }) {
    if (!achievementsData) return <p>Loading achievements...</p>;

    return (
        <div className="achievement-page">
            <div className="popup-header">
                <h2>Achievements</h2>
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} size="lg"/>
                </button>
            </div>
            <ul>
                {Object.entries(achievementsData).map(([key, achievement]) => {
                    const unlocked = unlockedAchievements[key];
                    return (
                        <li
                            key={key}
                            className={`achievement ${unlocked ? 'unlocked' : 'locked'}`}
                            style={{ opacity: unlocked ? 1 : 0.5 }}
                        >
                            <span className={`achievement-icon ${unlocked ? 'unlocked-icon' : 'locked-icon'}`}>
                                <FontAwesomeIcon icon={unlocked ? faCheckCircle : faLock} size="lg" />
                            </span>
                            <div className="achievement-title">
                                <strong>{achievement.name}</strong>: {achievement.description}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default AchievementPage;

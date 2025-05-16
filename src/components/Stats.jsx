import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";

function Stats({ cookies, cookiesPerSecond, upgrades, onClose, unlockedAchievements, achievementsData, timePlayed }) {
    const { t } = useTranslation();
    const totalAchievements = Object.keys(achievementsData).length;
    const unlockedCount = Object.values(unlockedAchievements).filter(Boolean).length;
    const percentageUnlocked = totalAchievements > 0 ? (unlockedCount / totalAchievements) * 100 : 0;

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}h ${m}m ${s}s`;
    }

    return (
        <div className="stats-page">
            <div className="popup-header">
                <h2 className="stats-title">{t('stats')}</h2>
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} size="lg"/>
                </button>
            </div>

                <div className="stat-item">
                    <h3>{t('total-cookies')}</h3>
                    <p>{cookies.toLocaleString()} cookies</p>
                </div>

                <div className="stat-item">
                    <h3>{t('cps')}</h3>
                    <p>{cookiesPerSecond.toLocaleString()} cookies/sec</p>
                </div>

                <div className="stat-item">
                    <h3>{t('unlocked-upgrades')}</h3>
                    <p>{upgrades.filter(upgrade => upgrade.unlocked).length} {t('upgrades').toLowerCase()}</p>
                </div>

                <div className="stat-item">
                    <h3>{t('time-played')}</h3>
                    <p>{formatTime(timePlayed)}</p>
                </div>

                <div className="stat-item">
                    <h3>{t('unlocked-achievement')}</h3>
                    <p>{percentageUnlocked.toFixed(2)}%</p>
                </div>

            </div>
            );
            }

            export default Stats;

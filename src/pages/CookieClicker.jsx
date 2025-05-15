import '../App.css';
import React, { useEffect, useState, useCallback } from 'react';
import Header from '../components/Header';
import CookieDisplay from '../components/CookieDisplay';
import CookieButton from '../components/CookieButton';
import useCookieGame from '../hooks/UseCookieGame.jsx';
import UpgradeMenu from '../components/UpgradeMenu.jsx';
import BottomNav from '../components/BottomNav.jsx';
import StatsPage from '../components/StatsPage.jsx';
import AchievementPage from '../components/Achievements.jsx';
import AchievementNotification from '../components/AchievementNotification.jsx';
import achievementsData from '../data/achievements.json';
import useSaveLoadCookies from '../hooks/useSaveLoadCookies';

function CookieClicker() {
    const {
        cookies,
        cookiesPerSecond,
        upgrades,
        handleClick,
        handleUpgrade,
        autoClickers,
        autoUpgrades,
        unlockedUpgrades,
        setCookies,
        setUpgrades,
    } = useCookieGame();

    // États locaux
    const [clickCount, setClickCount] = useState(0);
    const [timePlayed, setTimePlayed] = useState(0);
    const [unlockedAchievements, setUnlockedAchievements] = useState({});
    const [latestAchievement, setLatestAchievement] = useState(null);
    const [selectedTab, setSelectedTab] = useState(null);

    // Hook pour sauvegarde/restauration
    useSaveLoadCookies({
        cookies,
        setCookies,
        clickCount,
        setClickCount,
        timePlayed,
        setTimePlayed,
        unlockedAchievements,
        setUnlockedAchievements,
        latestAchievement,
        setLatestAchievement,
        upgrades,
        setUpgrades,
    });

    // Timer du temps de jeu
    useEffect(() => {
        const interval = setInterval(() => {
            setTimePlayed(prev => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Fonction stable pour débloquer un achievement
    const unlockAchievement = useCallback((key) => {
        setUnlockedAchievements(prev => {
            if (prev[key]) return prev; // déjà débloqué
            const updated = { ...prev, [key]: true };
            setLatestAchievement(achievementsData[key]);
            return updated;
        });
    }, []);

    // Reset automatique de la notification d'achievement
    useEffect(() => {
        if (latestAchievement) {
            const timeout = setTimeout(() => setLatestAchievement(null), 5000);
            return () => clearTimeout(timeout);
        }
    }, [latestAchievement]);

    // Gestion des clics
    const handleGameClick = () => {
        handleClick();
        setClickCount(prev => prev + 1);
    };

    // Vérification des achievements à chaque update pertinent
    useEffect(() => {
        // Achievements basés sur cookies
        [
            { key: "firstClick", condition: clickCount >= 1 },
            { key: "tenCookies", condition: cookies >= 10 },
            { key: "hundredCookies", condition: cookies >= 100 },
            { key: "thousandCookies", condition: cookies >= 1000 },
            { key: "tenThousandCookies", condition: cookies >= 10000 },
            { key: "hundredThousandCookies", condition: cookies >= 100000 },
            { key: "millionCookies", condition: cookies >= 1000000 },
            { key: "cookieMaster", condition: cookies >= 10000000 },
            { key: "billionCookies", condition: cookies >= 1000000000 },
            { key: "cookieGod", condition: cookies >= 1000000000000 },
            { key: "cookieMastery", condition: cookies >= 100000000000000 },

            { key: "superClicker", condition: clickCount >= 100 },
            { key: "grandClicker", condition: clickCount >= 1000 },
            { key: "cookieClickingPro", condition: clickCount >= 100000 },
            { key: "legendaryClicker", condition: clickCount >= 1000000 },

            { key: "millionaire", condition: cookies >= 1000000 },

            { key: "autoClicker", condition: autoClickers >= 1 },
            { key: "autoUpgrade", condition: autoUpgrades >= 1 },

            { key: "idlePlayer", condition: timePlayed >= 86400 },          // 24h
            { key: "unbreakable", condition: timePlayed >= 259200 },        // 3 jours

            { key: "achievementHunter", condition: Object.keys(unlockedAchievements).length === Object.keys(achievementsData).length },

            { key: "firstUpgrade", condition: unlockedUpgrades.length >= 1 },
            { key: "upgradeExpert", condition: unlockedUpgrades.length >= 10 },
            { key: "upgradeAddict", condition: unlockedUpgrades.length >= 50 },

            { key: "powerUpgrade", condition: upgrades.some(upg => upg.effect && upg.effect > 100) },

            { key: "maxedOutUpgrades", condition: upgrades.every(upg => upg.unlocked && upg.maxed) },

            { key: "allUpgrades", condition: upgrades.length > 0 && upgrades.every(upg => upg.unlocked) },

            { key: "speedRun", condition: cookies >= 1000 && timePlayed <= 60 },
        ].forEach(({ key, condition }) => {
            if (condition && !unlockedAchievements[key]) {
                unlockAchievement(key);
            }
        });
    }, [cookies, clickCount, timePlayed, upgrades, autoClickers, autoUpgrades, unlockedAchievements, unlockedUpgrades, unlockAchievement]);

    const handleClose = () => setSelectedTab(null);

    return (
        <div className="cookie-clicker">
            <Header />
            <h1 className="header-title">Cookie Clicker</h1>

            <CookieDisplay
                cookies={cookies}
                cookiesPerSecond={cookiesPerSecond}
            />
            <CookieButton handleClick={handleGameClick} />

            <div className="overlay-container">
                {selectedTab === 'upgrades' && (
                    <div className="overlay-content">
                        <UpgradeMenu
                            upgrades={upgrades}
                            cookies={cookies}
                            onUpgrade={handleUpgrade}
                            onClose={handleClose}
                        />
                    </div>
                )}
                {selectedTab === 'achievement' && (
                    <div className="overlay-content">
                        <AchievementPage
                            onClose={handleClose}
                            unlockedAchievements={unlockedAchievements}
                        />
                    </div>
                )}
                {selectedTab === 'stats' && (
                    <div className="overlay-content">
                        <StatsPage
                            cookies={cookies}
                            cookiesPerSecond={cookiesPerSecond}
                            upgrades={upgrades}
                            onClose={handleClose}
                            unlockedAchievements={unlockedAchievements}
                            achievementsData={achievementsData}
                            timePlayed={timePlayed}
                        />
                    </div>
                )}
            </div>

            {latestAchievement && (
                <AchievementNotification
                    achievement={latestAchievement}
                    onClose={() => setLatestAchievement(null)}
                />
            )}

            <BottomNav selected={selectedTab} onSelect={setSelectedTab} />
        </div>
    );
}

export default CookieClicker;

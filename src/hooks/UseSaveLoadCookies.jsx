import { useEffect } from 'react';

function useSaveLoadCookies({
                                cookies,
                                setCookies,
                                clickCount,
                                setClickCount,
                                timePlayed,
                                setTimePlayed,
                                unlockedAchievements,
                                setUnlockedAchievements,
                                upgrades,
                                setUpgrades,
                            }) {
    // Charger au montage
    useEffect(() => {
        const savedCookies = localStorage.getItem('cookies');
        if (savedCookies !== null) setCookies(Number(savedCookies));

        const savedClickCount = localStorage.getItem('clickCount');
        if (savedClickCount !== null) setClickCount(Number(savedClickCount));

        const savedTimePlayed = localStorage.getItem('timePlayed');
        if (savedTimePlayed !== null) setTimePlayed(Number(savedTimePlayed));

        const savedUnlockedAchievements = localStorage.getItem('unlockedAchievements');
        if (savedUnlockedAchievements !== null) {
            setUnlockedAchievements(JSON.parse(savedUnlockedAchievements));
        }

        const savedUpgrades = localStorage.getItem('upgrades');
        if (savedUpgrades !== null) {
            setUpgrades(JSON.parse(savedUpgrades));
        }
    }, [setCookies, setClickCount, setTimePlayed, setUnlockedAchievements, setUpgrades]);

    useEffect(() => {
        localStorage.setItem('cookies', cookies);
    }, [cookies]);

    useEffect(() => {
        localStorage.setItem('clickCount', clickCount);
    }, [clickCount]);

    useEffect(() => {
        localStorage.setItem('timePlayed', timePlayed);
    }, [timePlayed]);

    useEffect(() => {
        localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements));
    }, [unlockedAchievements]);

    useEffect(() => {
        localStorage.setItem('upgrades', JSON.stringify(upgrades));
    }, [upgrades]);
}

export default useSaveLoadCookies;

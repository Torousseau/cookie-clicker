import { useEffect, useState, useMemo } from 'react';
import upgradesData from '../data/UpgradesData.jsx';
import { calculateNewCost, calculateTotalCPS } from '../components/UpgradeUtils.jsx';
import upgradesDataRaw from "../data/UpgradesDataRaw.jsx";

export default function useCookieGame() {
    const [cookies, setCookies] = useState(0);
    const [clickPower] = useState(1);
    const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
    const [upgrades, setUpgrades] = useState(upgradesData);
    const [sessionCookies, setSessionCookies] = useState(0);

    // Calculs optimisés avec useMemo pour éviter recalculs inutiles
    const autoClickers = useMemo(() =>
            upgrades.filter(upg => upg.cps > 0)
                .reduce((sum, upg) => sum + upg.quantity, 0),
        [upgrades]
    );

    const autoUpgrades = autoClickers; // à modifier si besoin d'une différence

    const unlockedUpgrades = useMemo(() =>
            upgrades.filter(upg => upg.quantity > 0).map(upg => upg.id),
        [upgrades]
    );

    const reset = () => {
        setCookies(0);
        setCookiesPerSecond(0);
        setSessionCookies(0);
        setUpgrades(upgradesDataRaw);
    };



    // Gestion du clic manuel
    const handleClick = () => {
        setCookies(prev => prev + clickPower);
        setSessionCookies(prev => prev + clickPower);
    };

    // Gestion de l'achat d'un upgrade
    const handleUpgrade = (id) => {
        const upgradeToBuy = upgrades.find(u => u.id === id);

        if (!upgradeToBuy || cookies < upgradeToBuy.cost) {
            // Pas assez de cookies ou upgrade non trouvé
            return;
        }

        // Déduire le coût des cookies
        setCookies(prevCookies => prevCookies - upgradeToBuy.cost);

        // Mettre à jour l'état des upgrades
        setUpgrades(prevUpgrades =>
            prevUpgrades.map(upg => {
                if (upg.id === id) {
                    const newQuantity = upg.quantity + 1;
                    const newCost = calculateNewCost(upg.baseCost, newQuantity);
                    return {
                        ...upg,
                        quantity: newQuantity,
                        cost: newCost
                    };
                }
                return upg;
            })
        );
    };

    // Met à jour le CPS total dès que les upgrades changent
    useEffect(() => {
        setCookiesPerSecond(calculateTotalCPS(upgrades));
    }, [upgrades]);

    // Ajoute les cookies automatiquement selon le CPS (10 fois par seconde)
    useEffect(() => {
        if (cookiesPerSecond <= 0) return;

        const interval = setInterval(() => {
            const gain = cookiesPerSecond / 10;
            setCookies(prev => prev + gain);
            setSessionCookies(prev => prev + gain);
        }, 100);

        return () => clearInterval(interval);
    }, [cookiesPerSecond]);

    return {
        cookies,
        clickPower,
        cookiesPerSecond,
        upgrades,
        handleClick,
        handleUpgrade,
        autoClickers,
        autoUpgrades,
        sessionCookies,
        unlockedUpgrades,
        setCookies,
        setUpgrades,
        setCookiesPerSecond,
        reset
    };
}

import React from 'react';
import {useTranslation} from "react-i18next";

function UpgradeList({ upgrades, cookies, onUpgrade }) {
    const visibleUpgrades = upgrades.filter(upgrade => upgrade.unlocked);
    const { t } = useTranslation();


    const handleUpgrade = (id) => {
        onUpgrade(id);
        const currentIndex = upgrades.findIndex(upgrade => upgrade.id === id);
        if (currentIndex < upgrades.length - 1) {
            upgrades[currentIndex + 1].unlocked = true;
        }
    };

    return (
        <div className="upgrade-list">
            {visibleUpgrades.length > 0 ? (
                visibleUpgrades.map(upgrade => (
                    <button
                        key={upgrade.id}
                        onClick={() => handleUpgrade(upgrade.id)}
                        disabled={cookies < upgrade.cost}
                        className={`upgrade-button ${cookies < upgrade.cost ? 'disabled' : ''}`}
                    >
                        {t(`upgrades-name.${upgrade.key}`)} ({t('cost')} : {upgrade.cost.toLocaleString()} cookies)
                    </button>
                ))
            ) : (
                <p className="no-upgrades">{t('no-upgrades')}</p>
            )}
        </div>
    );
}

export default UpgradeList;

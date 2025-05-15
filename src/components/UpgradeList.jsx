import React from 'react';

function UpgradeList({ upgrades, cookies, onUpgrade }) {
    const visibleUpgrades = upgrades.filter(upgrade => upgrade.unlocked);

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
                        {upgrade.name} (Cost: {upgrade.cost} cookies)
                    </button>
                ))
            ) : (
                <p className="no-upgrades">No upgrades available yet!</p>
            )}
        </div>
    );
}

export default UpgradeList;

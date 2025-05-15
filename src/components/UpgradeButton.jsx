function UpgradeButton({ cookies, upgradeCost, upgradeClickPower }) {
    return (
        <button
            onClick={upgradeClickPower}
            className="upgrade-button"
            disabled={cookies < upgradeCost}
        >
            Upgrade Click Power (Cost: {upgradeCost} cookies)
        </button>
    );
}

export default UpgradeButton;
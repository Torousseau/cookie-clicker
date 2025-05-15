export function calculateNewCost(baseCost, quantity) {
    return Math.floor(baseCost * Math.pow(1.15, quantity));
}

export function calculateTotalCPS(upgrades) {
    return upgrades.reduce((sum, u) => sum + u.quantity * u.cps, 0);
}

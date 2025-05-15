import React from 'react';
import UpgradeList from './UpgradeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function UpgradeMenu({ upgrades, cookies, onUpgrade, onClose }) {
    return (
        <div className="upgrade-menu">
            <div className="popup-header">
                <h2 className="upgrade-title">Upgrades</h2>
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} size="lg"/>
                </button>
            </div>
            <UpgradeList upgrades={upgrades} cookies={cookies} onUpgrade={onUpgrade}/>
        </div>
            );
            }

            export default UpgradeMenu;

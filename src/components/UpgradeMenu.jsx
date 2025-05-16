import React from 'react';
import UpgradeList from './UpgradeList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";

function UpgradeMenu({ upgrades, cookies, onUpgrade, onClose }) {
    const { t } = useTranslation();
    return (
        <div className="upgrade-menu">
            <div className="popup-header">
                <h2 className="upgrade-title">{t("upgrades")}</h2>
                <button className="close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} size="lg"/>
                </button>
            </div>
            <UpgradeList upgrades={upgrades} cookies={cookies} onUpgrade={onUpgrade}/>
        </div>
            );
            }

            export default UpgradeMenu;

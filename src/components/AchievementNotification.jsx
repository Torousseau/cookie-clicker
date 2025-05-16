import React, { useEffect } from 'react';
import '../App.css'; // Assurez-vous que ce fichier CSS est bien importé
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from "react-i18next";

function AchievementNotification({ achievement, onClose }) {
    const { t } = useTranslation();
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // Ferme la notification après 5 secondes
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="steam-notification"> {/* Utiliser la classe du CSS */}
            <div className="steam-content">
                <div className="trophy-icon">
                    <FontAwesomeIcon icon={faTrophy} />
                </div>
                <div className="steam-text-section">
                    <div className="steam-title">{t('unlocked-achievement')} !</div>
                    <div className="steam-name">{achievement.name}</div>
                    <div className="steam-description">{achievement.description}</div>
                </div>
            </div>
            <div className="steam-glow"></div> {}
        </div>
    );
}

export default AchievementNotification;

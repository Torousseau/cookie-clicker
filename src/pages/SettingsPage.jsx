import React, { useState, useEffect } from 'react';
import '../assets/styles/SettingsPage.css';
import { useTranslation } from 'react-i18next';
import '../i18n';
import Header from "../components/Header.jsx";

const SettingsPage = () => {
    const { t, i18n } = useTranslation();

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const [language, setLanguage] = useState(i18n.language || 'fr');

    useEffect(() => {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const shouldBeDark = theme === 'dark' || (theme === 'system' && systemPrefersDark);

        if (shouldBeDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);



    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="settings-container">
            <Header />
            <h1>{t('settings')}</h1>

            <div className="form-group">
                <label htmlFor="theme">{t('theme')} :</label>
                <select
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                >
                    <option value="light">{t('light')}</option>
                    <option value="dark">{t('dark')}</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="language">{t('language')} :</label>
                <select
                    id="language"
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <option value="fr">Français</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                </select>
            </div>
        </div>
    );
};


export default SettingsPage;

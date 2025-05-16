import {useTranslation} from "react-i18next";

function CookieButton({ handleClick }) {
    const { t } = useTranslation();

    return (
        <button onClick={handleClick} className="cookie-button">
            {t('click-me')}
        </button>
    );
}

export default CookieButton;
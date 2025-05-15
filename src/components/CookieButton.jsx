function CookieButton({ handleClick }) {
    return (
        <button onClick={handleClick} className="cookie-button">
            <span className="cookie-emoji">🍪</span> Click Me!
        </button>
    );
}

export default CookieButton;
function CookieDisplay({ cookies }) {
    let roundCookie = Math.round(cookies * 100) / 100;
    return (
        <div>
            <p>Cookies: {roundCookie}</p>
        </div>
    );
}

export default CookieDisplay;
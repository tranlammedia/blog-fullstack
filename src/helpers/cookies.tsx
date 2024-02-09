export const setCookie = (value, name = "userData", days = 30) => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Thời gian hết hạn của cookie
    const expires = "expires=" + date.toUTCString();
    document.cookie =
        name + "=" + JSON.stringify(value) + ";" + expires + ";path=/";
};

export const getCookie = (name = "userData") => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return JSON.parse(
                cookie.substring(cookieName.length, cookie.length)
            );
        }
    }
    return null;
};

export const deleteCookie = (name = "userData") => {
    document.cookie =
        name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

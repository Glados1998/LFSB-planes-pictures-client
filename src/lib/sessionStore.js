export function getSessionJson(key, fallback = null) {
    if (typeof window === "undefined") {
        return fallback;
    }

    const raw = window.sessionStorage.getItem(key);
    if (!raw) {
        return fallback;
    }

    try {
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

export function setSessionJson(key, value) {
    if (typeof window === "undefined") {
        return;
    }

    window.sessionStorage.setItem(key, JSON.stringify(value));
}

export function hasSessionFlag(key) {
    if (typeof window === "undefined") {
        return false;
    }

    return window.sessionStorage.getItem(key) === "1";
}

export function setSessionFlag(key) {
    if (typeof window === "undefined") {
        return;
    }

    window.sessionStorage.setItem(key, "1");
}


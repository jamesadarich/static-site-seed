import { getToken, tokenHasExpired } from "./session/token";
import { navigate } from "gatsby";

export async function apiFetch(uri: string, details: any) {
    if (tokenHasExpired()) {
        notifyUserSessionHasExpired();
    }

    return fetch(uri, {
        ...details,
        headers: {
            token: JSON.stringify(getToken()),
            ...details.headers
        }
    });
}

function notifyUserSessionHasExpired() {
    navigate("/login?session_expired=true");
}

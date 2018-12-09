const TOKEN_STORAGE_NAME = "token";

export interface Token {
    expiry: number;
}

export function getToken(): Token {
    return JSON.parse(localStorage.getItem(TOKEN_STORAGE_NAME));
}

export function setToken(value: Token) {
    localStorage.setItem(TOKEN_STORAGE_NAME, JSON.stringify(value));
}

export function deleteToken() {    
    localStorage.removeItem(TOKEN_STORAGE_NAME);
}

export function tokenHasExpired() {
    return getToken().expiry > Date.now();
}

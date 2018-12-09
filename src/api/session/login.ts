import { setToken } from "./token";

export async function login(username: string, password: string) {
    const response = await fetch("/token",
    {
        method: "POST",
        body: JSON.stringify({
            username,
            password
        })
    });

    if (response.ok === false) {
        throw new Error("login failed");
    }

    setToken(await response.json());
}

import { apiFetch } from "../api-fetch";
import { deleteToken } from "./token";

export async function logout() {
    const response = await apiFetch("/token", {
        method: "DELETE"
    });

    if (response.ok === false) {
        throw new Error("Something went wrong trying to log out");
    }

    deleteToken();
}
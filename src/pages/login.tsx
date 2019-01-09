import * as React from "react";
import { Page } from "../layouts/page";

export default function LoginPage() {
    return (
        <Page title="Login" description="Login">
            <form>
                <h1>Login</h1>
                {/*TODO: FIND BETTER WAY */location.search.indexOf("session_expired") > -1 && "SESSION EXPIRED"}
                <input name="username" type="text" />
                <input name="password" type="password" />
                <button type="submit">Login</button>
            </form>
        </Page>
    );
}

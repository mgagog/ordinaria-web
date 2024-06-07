import { setCookie } from "$std/http/cookie.ts";
import { FunctionComponent } from "preact";

const Logout: FunctionComponent = () => {
    const resetAuth = () => {
        document.cookie = "auth="
    }
    return (
        <a href="/login"><button onClick={resetAuth}>Logout</button></a>
    )
}

export default Logout;
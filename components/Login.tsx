import { FunctionComponent } from "preact";


export type ErrorProps = {
    errorMessage: boolean;
}

const Login: FunctionComponent<ErrorProps> = (props) => {
    return (
        <div class="login-container">
            <form method="POST" class="login_form">
                <h2>Login</h2>
                {props.errorMessage && <span class="error-message">Incorrect credentials or user does not exist</span>}
                <label for="email">Email</label>
                <input name="email" type="email"/>
                <label for="password">Password</label>
                <input name="password" type="password"/>
                <button type="submit">Login</button>
                <p class="register-link">Don't have and account? <a href="/register">Register</a></p>
            </form>
        </div>
    );
}

export default Login;
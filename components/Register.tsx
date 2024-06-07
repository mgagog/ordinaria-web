import { FunctionComponent } from "preact";

export type ErrorProps = {
    errorMessage: boolean;
}

const Register: FunctionComponent<ErrorProps> = (props) => {
    return (
        <div class="register-container">
            <form method="POST">
                <h2>Register</h2>
                {props.errorMessage && <span class="error-message">"That email is already registered or unknown error"</span>}
                <label for="name">Full Name</label>
                <input name="name" type="text"/>
                <label for="email">Email</label>
                <input name="email" type="email"/>
                <label for="password">Password</label>
                <input name="password" type="password"/>
                <button type="submit">Register</button>
                <p class="register-link">Already have and account? <a href="/login" class="register-link">Login</a></p>
            </form>
        </div>
    );
}

export default Register;
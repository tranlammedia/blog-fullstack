import FormSignin from "./FormSignin";
import FormSignup from "./FormSignup";
import FormSocial from "./FormSocial";
import "./index.css";

export default function FormSigninProvider() {
    return (
        <>
            <FormSignin>
                <FormSocial></FormSocial>
            </FormSignin>
            <FormSignup>
                <FormSocial></FormSocial>
            </FormSignup>
        </>
    );
}

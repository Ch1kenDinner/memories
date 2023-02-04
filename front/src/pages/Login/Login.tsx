import { LoginForm } from "../../sections/LoginForm/LoginForm";
import "./Login.scss";

export const Login = (): JSX.Element => {
  return (
    <div className="auth">
			<LoginForm />
    </div>
  );
};

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { myFetch } from "../../api";
import { defaultValidationRules } from "../../common/const";
import { IValidateRule } from "../../common/types";
import { Input } from "../../components/Input/Input";
import { PasswordInput } from "../../components/PasswordInput/PasswordInput";
import { useValidate } from "../../hooks/useValidate";
import "./LoginForm.scss";

export interface ILoginFormFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const defaultLoginFields: ILoginFormFields = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validateFiledsRules: Record<keyof ILoginFormFields, IValidateRule[]> = {
  email: [
    defaultValidationRules.notBeEmpty,
    { rule: /\w+@\w+\.\w+/g, message: "Uncorrect format" },
  ],
  password: [
    defaultValidationRules.notBeEmpty,
    { rule: /.{6}/, message: "At least 6 characters" },
  ],
  confirmPassword: [
    defaultValidationRules.notBeEmpty,
    { rule: /.{6}/, message: "At least 6 characters" },
  ],
  name: [defaultValidationRules.notBeEmpty],
};

export const LoginForm = (): JSX.Element => {
  const [logining, setLogining] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMess, setErrorMess] = useState<string>("");

  // const [fields, setLoginFields] =
  //   useState<ILoginFormFields>(defaultLoginFields);
  const { fields, setField, isValid, validating, setValidating, errorMessageFields } = useValidate(
    validateFiledsRules,
    defaultLoginFields
  );

  const navigate = useNavigate();

  const handleSubmit = () => {
    setValidating(true);
    // if (logining && (!fields || !fields.email || !fields.password))
    //   return console.log("handle except");
    // if (
    //   !logining &&
    //   (!fields ||
    //     !fields.email ||
    //     !fields.confirmPassword ||
    //     !fields.name ||
    //     !fields.password)
    // )
    //   return console.log("handle except");
    if ((logining && isValid(["email", 'password'])) || (!logining && isValid())) {
			fetchLogin(fields).then(() => navigate("/", { replace: true }));
		}
  };

  const fetchLogin = async (request) => {
    setLoading(true);
    let response;
    try {
      if (logining) {
				response = await myFetch("postSignIn", {}, request)
      } else {
				response = await myFetch("postSignUp", {}, request)
      }
      localStorage.setItem("profile", JSON.stringify(response.data));
      navigate("/", { replace: true });
    } catch (err: any) {
      err.response.data.mess && setErrorMess(err.response.data.mess);
    }
  };
	

  useEffect(() => {
    const { google } = window as any;
    if (google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: fetchLogin,
      });

      google.accounts.id.renderButton(document.querySelector("#sign_google"), {
        type: "icon",
        shape: "pill",
        theme: "filled_black",
      });
    }
  }, [logining]);

  return (
    <div className="form">
      {!logining && (
        // <TextInput
        //   type="text"
        //   placeholder="name"
        //   validating={validating}
        //   value={fields.name}
        //   setValue={(value) =>
        //     setLoginFields((prev) => ({ ...prev, name: value }))
        //   }
        //   validateRules={validateFiledsRules.name}
        // />
        <Input
          value={fields.name}
          setValue={(value) => setField("name", value)}
          placeholder={"Name"}
          errorMessage={validating ? errorMessageFields?.name : ""}
        />
      )}
      {/* <TextInput
        value={fields.email}
        setValue={(value) =>
          setLoginFields((prev) => ({ ...prev, email: value }))
        }
        type="email"
        // validating={validating}
        validateRules={validateFiledsRules.email}
      /> */}
      <Input
        value={fields.email}
        setValue={(value) => setField("email", value)}
        errorMessage={validating ? errorMessageFields?.email : ""}
        placeholder="Email"
      />
      {/* <TextInput
        value={fields.password}
        setValue={(value) =>
          setLoginFields((prev) => ({ ...prev, password: value }))
        }
        type="password"
        // validating={validating}
        validateRules={validateFiledsRules.password}
      /> */}
      <PasswordInput
        value={fields.password}
        setValue={(value) => setField("password", value)}
        errorMessage={validating ? errorMessageFields?.password : ""}
        placeholder="Password"
      />
      {!logining && (
        // <TextInput
        //   value={fields.confirmPassword}
        //   setValue={(value) =>
        //     setLoginFields((prev) => ({ ...prev, confirmPassword: value }))
        //   }
        //   type="password"
        //   placeholder="confirm password"
        //   // validating={validating}
        //   validateRules={validateFiledsRules.password}
        // />
        <PasswordInput
          value={fields.confirmPassword}
          setValue={(value) => setField("confirmPassword", value)}
          errorMessage={validating ? errorMessageFields?.confirmPassword : ""}
          placeholder="Confirm password"
        />
      )}
      {errorMess && <span className="errorMess">{errorMess}</span>}
      <button type="submit" onClick={() => handleSubmit()}>
        {logining ? "Sign In" : "Sign Up"}
      </button>
      <div id="sign_google"></div>
      <button className="tl" onClick={() => setLogining((prev) => !prev)}>
        {logining ? (
          <>
            dont have an account? <span>{"sign up"}</span>
          </>
        ) : (
          <>
            alerady have an account? <span>{"sing in"}</span>
          </>
        )}
      </button>
    </div>
  );
};

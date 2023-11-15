import { useState } from "react";
import { isValidEmail, isPasswordCorrect, isEmpty } from "utils/validators";

type SignFormProps = {
  type: "login" | "register";
  onSubmit(email: string, password: string): void;
};

type AuthMessages = "login" | "register";
type AuthFields = "title" | "infoMessage" | "switchSignActon" | "buttonMessage" | "navigationLink";
type SignFormMessages = Record<AuthMessages, Record<AuthFields, string>>;

//TODO move to constants
const messages: SignFormMessages = {
  login: {
    title: "Log In",
    infoMessage: "Log in to access your account",
    switchSignActon: "Don't have an account yet? Register.",
    buttonMessage: "Log in",
    navigationLink: "/register",
  },
  register: {
    title: "Register",
    infoMessage: "Register to create an account",
    switchSignActon: " You already have an account? Log in.",
    buttonMessage: "Register",
    navigationLink: "/login",
  },
};

const SignForm = (props: SignFormProps):JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const actionMessages = messages[props.type];

  const resetError = (errorField: string) => {
    setErrors((prevStyle) => ({
      ...prevStyle,
      [errorField]: "",
    }));
  };

  const checkEmail = () => {
    if (!isValidEmail(email)) {
      setErrors((prevStyle) => ({
        ...prevStyle,
        email: "Please enter valid email",
      }));
    } else resetError("email");
  };

  const checkPassword = () => {
    if (!isPasswordCorrect(password)) {
      setErrors((prevStyle) => ({
        ...prevStyle,
        password: "Password must be at least 6 characters",
      }));
    } else resetError("password");
  };

  const handleSubmit = () => {
    props.onSubmit(email, password);
  };

  const isButtonDisabled = isEmpty(email) || isEmpty(password) ? true : false;

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 mt-20">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold">{actionMessages.title}</h1>
        <p className="text-sm">{actionMessages.infoMessage}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="form-field">
            <label className="form-label">Email address</label>

            <input
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => checkEmail()}
              placeholder="Type here"
              type="email"
              className="input max-w-full"
            />
            <label className="form-label">
              <span className="form-label-alt text-red-600">{errors.email ? errors.email : ""}</span>
            </label>
          </div>
          <div className="form-field">
            <label className="form-label">Password</label>
            <div className="form-control">
              <input
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => checkPassword()}
                placeholder="Type here"
                type="password"
                className="input max-w-full"
              />
            </div>
            <label className="form-label">
              <span className="form-label-alt text-red-600">{errors.password ? errors.password : ""}</span>
            </label>
          </div>
          <div className="form-field pt-5">
            <div className="form-control justify-between">
              <button
                onClick={handleSubmit}
                type="button"
                disabled={isButtonDisabled}
                className="btn btn-primary w-full"
              >
                {actionMessages.buttonMessage}
              </button>
            </div>
          </div>

          <div className="form-field">
            <div className="form-control justify-center">
              <a className="link link-underline-hover link-primary text-sm" href={actionMessages.navigationLink}>
                {actionMessages.switchSignActon}
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignForm;

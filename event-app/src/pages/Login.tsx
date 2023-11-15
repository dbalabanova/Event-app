import LoginForm from "components/auth/LoginForm";
import Navigation from "components/Navigation";

const LoginPage = ():JSX.Element => {
  return (
    <>
      <Navigation />
      <LoginForm />
    </>
  );
};

export default LoginPage;

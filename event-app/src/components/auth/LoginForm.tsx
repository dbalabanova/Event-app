import { useState } from "react";
import { auth } from "services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "store";
import { useDispatch } from "react-redux";
import SignForm from "components/auth/SignForm";
import Notification from "components/shared/Notification";

const LoginForm = ():JSX.Element => {
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");

  const handleSubmit = (email: string, password: string) => {
    setFirebaseError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        dispatch.auth.login(useCredential);
        navigate("/");
      })
      .catch((e) => {
        setFirebaseError(e.message);
      });
  };

  return (
    <>
      <SignForm type="login" onSubmit={handleSubmit} />
      {firebaseError ? <Notification state="error" title="Firebase error" message={firebaseError} /> : null}
    </>
  );
};

export default LoginForm;

import { useState } from "react";
import { auth } from "services/firebase";
import { Dispatch } from "store";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Notification from "components/shared/Notification";
import SignForm from "components/auth/SignForm";

const RegisterForm = ():JSX.Element => {
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");

  const handleSubmit = (email: string, password: string) => {
    setFirebaseError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        dispatch.auth.login(useCredential);
        dispatch.user.register(useCredential);
        navigate("/");
      })
      .catch((e) => {
        setFirebaseError(e.message);
      });
  };

  return (
    <>
      <SignForm type="register" onSubmit={handleSubmit} />
      {firebaseError ? <Notification state="error" title="Firebase error" message={firebaseError} /> : null}
    </>
  );
};

export default RegisterForm;

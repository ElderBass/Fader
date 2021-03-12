import React from "react";
import { useUserContext } from "../../utils/UserState";
import { ADD_USER } from "../../utils/action";
import SignupForm from "../../components/SignupForm";
import SignupMessage from "../../components/SignupMessage";
import API from "../../utils/API";
import "./style.css";

const Signup = (props) => {
  const [state, dispatch] = useUserContext();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      stageName: e.target.stageName.value,
      genre: e.target.genre.value,
      city: e.target.city.value,
    };
    console.log(user);
    API.addUser(user)
      .then((result) => {
          console.log("result in add user =", result.data)
        dispatch({
          type: ADD_USER,
          user: result.data,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!state.isSignedUp ? (
        <SignupForm signup={handleFormSubmit} />
      ) : (
        <SignupMessage />
      )}
    </>
  );
};

export default Signup;

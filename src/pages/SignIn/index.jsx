import React, { useState } from "react";
import axios from "axios";
import { URL_LOGIN } from "../../request_links";

export default function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMgs, setErrorMgs] = useState("");
  const [successMgs, setSuccessMgs] = useState("");

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const entity = {
      email: email,
      password: password,
    };

    axios
      .post(URL_LOGIN, entity)
      .then((response) => {
        try {
          if (response.data.success) {
            console.log(response.data)
            console.log(response.headers)
            setEmail("");
            setPassword("");
            setErrorMgs("");
            setSuccessMgs(response.data.message || "");
            localStorage.setItem('accessToken', response.data.accessToken);
          } else {
            setErrorMgs(response.data.message || "");
          }
        } catch (error) {
          setErrorMgs(error.message || "");
        }
      })
      .catch((error) => {
        setErrorMgs(error.response.data.message || "");
      });

    console.log("Sign in");
  };
  return (
    <div className="container">
      <h1 className="h1 text-center">Sign In</h1>
      <form onSubmit={handleSubmitLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            type="email"
            className="form-control"
            id="email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            type="password"
            className="form-control"
            id="password"
            required
          />
        </div>
        {errorMgs ? (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            <strong>Error: </strong>
            <span>{errorMgs}</span>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : (
          ""
        )}
        {successMgs ? (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{successMgs}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        ) : (
          ""
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import { URL_REGISTER } from "../../request_links";
export default function Registration() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMgs, setErrorMgs] = useState("");
  const [successMgs, setSuccessMgs] = useState("");
  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const entity = {
      name: name,
      age: age,
      email: email,
      password: password,
    };

    axios
      .post(URL_REGISTER, entity)
      .then((response) => {
        try {
          if (response.data.success) {
            setName("");
            setAge(0);
            setEmail("");
            setPassword("");
            setErrorMgs("");
            setSuccessMgs(response.data.message || "");
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

    console.log("Register");
  };
  return (
    <div className="container">
      <h1 className="h1 text-center">Sign Up</h1>
      <form onSubmit={handleSubmitRegister}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
            type="text"
            className="form-control"
            id="name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            value={age}
            onChange={({ target }) => setAge(target.value)}
            type="number"
            className="form-control"
            id="age"
            required
          />
        </div>

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
            <strong>{successMgs}. Please login.</strong>
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

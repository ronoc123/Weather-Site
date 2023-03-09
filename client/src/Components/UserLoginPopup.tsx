import React from "react";
import { useAppContext } from "../context/AppContext";

import { TextField, Button } from "@mui/material";
import { useState } from "react";

const UserLoginPopup = () => {
  const ctx = useAppContext();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  if (ctx == null) return <div>Loading...</div>;

  const { toggleUserInfo, loginUser } = ctx;

  const handleChange = () => {};

  const login = () => {
    const currentUser = { username, password, email };
    loginUser(currentUser);
  };

  return (
    <div className="pop-up grid place-items-center">
      <div
        className="grid 
      gap-4 bg-white max-w-lg rounded-md p-12 sm:w-90 md:w-2/3"
      >
        <h1 className="text-4xl text-center w-100 mb-4 font-medium">Login</h1>
        <TextField
          id="outlined-controlled"
          label="Email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          id="outlined-controlled"
          label="Username"
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          id="outlined-controlled"
          label="Password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
        <Button variant="outlined" onClick={login}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default UserLoginPopup;

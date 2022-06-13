
import React from "react";
import { Button } from 'react-bootstrap';
import Header from './Header';
import "./Login.css";
import { handleLoginAuth }  from "../utils/spotify";

const Login = (props) => {
  const handleLogin = () => {
    window.location = handleLoginAuth};
  return (
    <div className="login">
        <Header class ="Login-header" />

        <Button variant="info" 
        type="submit"
        onClick={handleLogin}>
        Login to spotify
      </Button>
    </div>
);
};

export default Login;
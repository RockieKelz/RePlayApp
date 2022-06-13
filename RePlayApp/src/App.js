import './App.css';
import Login from "./pages/Login";
import Home from "./pages/Home";
import React, { useEffect } from "react";
import { useStateProvider } from "./utils/stateprovider";
import { casesReducer } from "./utils/constants";

const App = () => {
    //read and set token using state provider
    const [{ token }, dispatch] = useStateProvider();
    useEffect(() => {
      const hash = window.location.hash;
      if (hash) {
        const token = hash.substring(1).split("&")[0].split("=")[1];
        if (token) {
          dispatch({ type: casesReducer.SET_TOKEN, token });
        }
      }
      document.title = "RePlay";
    }, [dispatch, token]);
    return (
        <div className="App">
            {token ?
            <Home />
            :
            <Login />
          }
        </div>
    );
}

export default App;

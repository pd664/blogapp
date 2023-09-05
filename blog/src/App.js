import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.bundle"
import { BrowserRouter } from 'react-router-dom';
import Rotes from './routes/Rotes'
import { getToken, setUserSession, removeUserSession } from "./utils/Common";
import axios from "axios";
import Header from "./components/header/Header";

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return ()  => {}
    }

    else {
      return axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
    }
  }, [getToken]);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      
      <BrowserRouter>
        <Header />
        <Rotes />
      </BrowserRouter>
      
    </div>
  );
}

export default App;

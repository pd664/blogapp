import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';
import { useNavigate } from "react-router-dom";

function Welcome(props) {
    const user = getUser();
    const navigate = useNavigate()
    const handleLogout = () => {
        removeUserSession();
        navigate('/signin');
      }
  return <div>
      <h1>Welcome!</h1>
      Welcome {user.name}!<br /><br />
      <input type="button" onClick={handleLogout} value="Logout" />
  </div>;
}

export default Welcome;

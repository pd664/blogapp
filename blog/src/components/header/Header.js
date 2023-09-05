import React from 'react'
import '../../static/header/header.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExplosion, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from 'react-router-dom';
import { getUser, removeUserSession } from '../../utils/Common';

function Header() {
  let navigate = useNavigate()
  const handleSignin = () => {
    navigate("/signin");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const handleLogout = () => {
    removeUserSession();
    navigate('/signin');
  }

  // if(getUser()) return (
  //   <div>
      
  //   </div>
  // )

  return (
    <div className='header d-flex align-items-center justify-content-center'>
      <div className='d-flex align-items-center justify-content-center w-100'>
        <div className='header_icon'>
          <Link to='/'><FontAwesomeIcon className='font_header_icon' icon={faExplosion} size='40px' /></Link>
        </div>
      </div>
      {!getUser() ?  (<div className="credbtns d-flex align-items-center">
        <button className="subtn container m-2" onClick={handleSignup}>
          SIGNUP
        </button>
        <button className="sibtn container m-2" onClick={handleSignin}>
          SIGNIN
        </button>
      </div>) :

      <div className='float-end p-1'>
        <button className="signout userhome_btn header_signout" onClick={handleLogout}>
          <span id="signoutcontent">
            <FontAwesomeIcon icon={faSignOutAlt} /> SIGN OUT
          </span>
        </button>
      </div>}
    </div>

  )
}

export default Header
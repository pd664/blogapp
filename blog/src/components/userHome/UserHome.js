import React, { useState, useEffect } from "react";
import "../../static/userHome/userHome.css";
import { getUser, removeUserSession, getToken } from "../../utils/Common";
import axios from "axios";
import Postpreview from "./PostPreview";
import { faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function UserHome(props) {
  const user = getUser();
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate()

  useEffect(() => {
    const token = getToken();
    axios
      .post(`http://localhost:4000/user/posts`, {
        token: token,
      })
      .then((response) => {
        setPosts(response.data.message);
      })
      .catch((error) => console.log(error));
  }, [posts]);

  const handleNewPost = () => {
    navigate("/edit");
  };

  const handleLogout = () => {
    removeUserSession();
    navigate("/signin");
  };
  return (
    <div>
      <div>
        <div></div>
        <div className="container-fluid">
          <div className="row content d-flex flex-nowrap">
            <div className="sidenav sidenav-left">
              <posts className="welcome_name">
                Welcome {user.name}!<br />
                <br />
              </posts>
              <button className="newpost userhome_btn" onClick={handleNewPost}>
                <span id="newPostcontent">
                  <FontAwesomeIcon icon={faPlus} /> New POST
                </span>
              </button>
              <br />
              <br />
              <button className="signout userhome_btn userhome_signout" onClick={handleLogout}>
                <span id="signoutcontent">
                  <FontAwesomeIcon icon={faSignOutAlt} /> SIGN OUT
                </span>
              </button>
            </div>
            {/* <div className="bod border-right"></div> */}
            <div className="posts p-5 ml-5">
              <h2>Your Posts</h2>

              {posts.map((post, key) => {
                let a = post.postbody;
                let b = a.search('<img src="');
                let c;
                if (b !== -1) {
                  c = a.indexOf(">", b);
                }

                return (
                  <div className="">
                    <Postpreview
                      key={key}
                      post={post.postbody}
                      title={post.posttitle}
                      img={a.substring(b, c + 1)}
                      authourid={post.authourid}
                      postid={post._id}
                    />
                    {/* <h1>{post.id}</h1>
                      <h1>{b}</h1>
                      <h1>{c}</h1>
                      <h1>{a}</h1> */}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserHome;

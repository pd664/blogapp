import React, { useState, useEffect } from 'react'
import '../../static/landing/landing.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom'
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Homepostpreview(props) {
    const [readMore, setReadMore] = useState(false);
    let navigate = useNavigate()
    
    // const {post} = props.postbody
    const a = <div dangerouslySetInnerHTML={{ __html: props.data.postbody }} />;
  
    const linkName = readMore ? "Read Less << " : "Read More >> ";
  
    let im = props.data.postbody;
  
    let b = im.search('<img src="');
    let c;
    if (b !== -1) {
      c = im.indexOf(">", b);
    }
  
    let imgsize = im.substring(b, c + 1);
    let re = imgsize.replace(">", 'class="image">');
    return (
      <div>
        <div className="container border border-secondary mt-5">
          <div className="container d-flex flex-row d-highlight p-2 mb-2">
            <div className="imagecont col-3 bd-highlight align-middle">
              {/* <h1>{imgsize}</h1> */}
              {b !== -1 ? (
                <div dangerouslySetInnerHTML={{ __html: re }} />
              ) : (
                <span className="imgicon">
                  <FontAwesomeIcon icon={faImage} size="10x" />
                </span>
              )}
            </div>
            <div className="post bd-highlight">
              <div className="title container">
                <h2>{props.data.posttitle}</h2>
              </div>
              <div className="underline border-bottom mt-5"></div>
              <div className="readmore">
                <a
                  className="read-more-link"
                  onClick={() => {
                    setReadMore(!readMore);
                  }}
                >
                  <h3>{linkName}</h3>
                </a>
                {readMore && a}
              </div>
              <div>{readMore && a}</div>
              <div className="underline border-bottom mt-1"></div>
              <div className="authour">
                <p>
                  - By <b>{props.data.authourname}</b>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

function Landing() {
    console.log("landing")
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState("");
    
    // let data = useSelector((state) => setPosts(state.allData.data[0]))
  useEffect(
     () => {
       axios
        .get(`http://localhost:4000/getAllPost`)
        .then((res) => {
        console.log("res.data")
          setPosts(res.data);
        })
        .catch((error) => setError("Something went"));
    }, []
  );

  return (
    <div>
      <div>
        
      </div>
      <div>
        <div className="homeheading container mt-2">
          <h1>Latest Perspectives</h1>
        </div>
        <>
          <Pagination
            data={posts}
            RenderComponent={Homepostpreview}
            pageLimit={posts.length}
            dataLimit={4}
          />
        </>
      </div>
    </div>
  )
}

export default Landing
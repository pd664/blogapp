import React, { useState } from "react";
import "../../styles/postpreview.css";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/homepostpreview.css";
import axios from "axios";

function Homepostpreview(props) {
  const [readMore, setReadMore] = useState(false);
  const a = <div dangerouslySetInnerHTML={{ __html: props.post }} />;
  const linkName = readMore ? "Read Less << " : "Read More >> ";
  let imgsize = props.img;
  let re = imgsize.replace('>', 'class="image">');
  return (
    <div>
      <div className="container border border-secondary mt-5">
        <div className="container d-flex flex-row d-highlight mb-3 p-2">
          <div className="container imagecont col-3 bd-highlight align-middle mt-1">
            {/* <h1>{imgsize}</h1> */}
            {props.img ? (
              <div dangerouslySetInnerHTML={{ __html: re }} />
            ) : (
              <span className="imgicon">
                <FontAwesomeIcon icon={faImage} size="10x"  />
              </span>
            )}
          </div>
          <div className="post bd-highlight container">
            <div className="title container">
              <h2>{props.title}</h2>
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
                <p>- By <b>{props.authourname}</b> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepostpreview;

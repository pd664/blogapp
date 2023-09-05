import React, { useState } from "react";
import "../../static/userHome/postPreview.css";
import { faImage, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function Postpreview(props) {
  const [readMore, setReadMore] = useState(false);
  const a = <div dangerouslySetInnerHTML={{ __html: props.post }} />;
  const linkName = readMore ? "Read Less << " : "Read More >> ";
  let imgsize = props.img;
  let re = imgsize.replace('>', 'class="image">');
  const handleDelete = async () => {
    await alert("Are you sure you want to delete the post");
    axios
      .post("/deletepost", {

        id: props.postid,
        // token: props.token,
        authourid: props.authourid,
      })
      .then((res) => {
        alert("your posts has been deleted");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div className="p-1 d-highlight">
      <div className="cont border border-secondary">
        <div className="d-flex justify-content-between  p-2">
          <div className="d-flex ">
            <div className="imagecont bd-highlight">
              {/* <h1>{imgsize}</h1> */}
              {props.img ? (
                <div dangerouslySetInnerHTML={{ __html: re }} />
              ) : (
                <span className="imgicon ">
                  <FontAwesomeIcon icon={faImage} className="font_img_icon img-fluid" />
                </span>
              )}
            </div>
            <div className="post bd-highlight px-2">
              <div className="title">
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
              {/* <div>{readMore && a}</div> */}
              
            </div>
          </div>
          <div className="p-2">
                <button className="delbtn" onClick={handleDelete}>
                  <span className="del">
                    <FontAwesomeIcon icon={faTrash} className="del_content" />
                  </span>
                </button>
              </div>
        </div>
      </div>
      {/* <div className="border border-dark">
        <ul className="list-group list-group-flush nav nav-pills nav-stacked">
          <li className="list-group-item">
            <div className="listdata d-flex flex-row justify-content-between mb-3">
              <div className="img">
                
                { props.img ? <div dangerouslySetInnerHTML={{ __html: re }} /> : <span className="imgicon"><FontAwesomeIcon icon={faImage} size="10x" /></span>}

              </div>
              <div className="right ml-5">
                <div className="title mt-3">
                  <b>
                    <h2>{props.title}</h2>
                  </b>
                </div>
                <div className="border-bottom mt-5"></div>
                <div className="content mt-5">
                  <a
                    className="read-more-link"
                    onClick={() => {
                      setReadMore(!readMore);
                    }}
                  >
                    <h3>{linkName}</h3>
                  </a>
                </div>
              </div>
              {readMore && a}
              <div className="p-2">
                <button className="delbtn mr-2" onClick={handleDelete}>
                  <span className="p-2 del">
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div> */}
    </div>
  );
}

export default Postpreview;

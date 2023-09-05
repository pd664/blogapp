import React, {useState, useRef} from 'react';
import JoditEditor from "jodit-react";
import axios from 'axios';
import { getUser } from '../../../utils/Common';
import { useNavigate } from "react-router-dom";

function Createblog(props) {

  const editor = useRef(null)
	const [content, setContent] = useState(props.content ? props.content : '')
  const [title, setTitle] = useState(props.title ? props.title : '')
  const [error, setError] = useState(null);
  const user = getUser();
  let navigate = useNavigate()
  // console.log("user", user)
	const config = {
		readonly: false 
	}

  const handle = () => {
    // let search = 
    let con = content.split("'").join("''")
    let tit = title.split("'").join("''")
    console.log("user", getUser().userId, getUser().name)
    axios.post(`http://localhost:4000/addpost`, {
      
      userid: user.userId,
      username: user.name,
      body: con,
      title: tit
    })
    
    .then((response) => {
      alert("Are you sure you want to publish this blog")
      navigate('/blog/posts')
    })
    .catch((err) => {
      if(err.response.status === 406) setError(err.response.data.message)
      else setError("THERE IS SOME ERROR PLEASE TRY AGAIN AFTER SOME TIME.")
    })
  }
  return <div className="white" style={{"height": "1000px"}}>
    <div className="border-none d-flex flex-column mt-4">
      <input className="border-0 p-2 form-control" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
    </div>
    <div className="border border-danger"></div>
    <div className="container mt-5">
    <JoditEditor
      
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={newContent => setContent(newContent)}
       />
    </div>
    
      <div className="container mt-5">
      <button type="button" className="btn btn-danger" onClick={handle}>PUBLISH</button>
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
  </div>;
}

export default Createblog;

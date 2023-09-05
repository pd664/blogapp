import React, {useEffect} from 'react'
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PrivateRoute from '../utils/PrivateRoute'
import PublicRoute from '../utils/PublicRoute'
import SignIn from '../components/authentication/SignIn';
import SignUp from '../components/authentication/SignUp';
import Landing from '../components/landing/Landing';
import { allData } from '../reduxComps/action/index'
import UserHome from '../components/userHome/UserHome';
import CreateBlog from '../components/userHome/posts/CreateBlog'

function Rotes() {
  let dispatch = useDispatch()
  
  // useEffect(() => {
  //   axios.get('http://localhost:4000/getAllPost')
  //   .then((res) => {
  //     console.log("ress", res.data)
  //     dispatch(allData(res.data))
  //   })
  //   .catch((err) => {
  //     console.log("err in fetching", err)
  //   })
  // }, [])

  return (
    <div>
        <Routes>
            <Route exact path="/" element={<PublicRoute component={Landing} />}></Route>
            <Route exact path="/signin" element={<PublicRoute component={SignIn} />}></Route>
            <Route exact path='/signup' element={<PublicRoute component={SignUp} />} />
            <Route exact path='/blog/posts' element={<PrivateRoute component={UserHome} />} />
            <Route exact path='/edit' element={<PrivateRoute component={CreateBlog} />} />
        </Routes>
    </div>
  )
}

export default Rotes
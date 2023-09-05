import React from 'react'
import { Route, Navigate } from 'react-router-dom';
import { getToken } from './Common';

function PrivateRoute({component: Component}) {
    return getToken() ? <Component /> : <Navigate to={{ pathname: '/signin' }} />
}

export default PrivateRoute
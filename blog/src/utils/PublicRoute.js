import React from 'react'
import { Navigate } from 'react-router-dom';
import { getToken } from './Common';

function PublicRoute({component: Component}) {
    return !getToken() ? <Component /> : <Navigate to={{pathname : '/'}} />
}

export default PublicRoute
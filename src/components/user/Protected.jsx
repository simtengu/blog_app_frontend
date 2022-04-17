import React from 'react';
import { Outlet } from 'react-router-dom';
import Auth from '../../pages/Auth';
export const isAuthenticated = ()=>{
    return true;
}
const Protected = () => {
    if(isAuthenticated()){
        return <Outlet />
    }else{
        return <Auth />
    }
    
}
 
export default Protected;
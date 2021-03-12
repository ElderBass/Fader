import React from 'react';
import LogoutMessage from "../../components/Logout/LogoutMessage";
import { useUserContext } from "../../utils/UserState";
import { LOGOUT_USER } from "../../utils/action";

import './style.css'


const Logout = (props) => {

    const [ state, dispatch ] = useUserContext();

    const handleLogout = () => {
       
        dispatch({
            type: LOGOUT_USER,
        })
        window.location.href ="/";
    }

return (

    <LogoutMessage logout={handleLogout}/>
);
}


export default Logout;
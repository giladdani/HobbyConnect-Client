import React, { useState } from "react"
import { StatusCodes } from "http-status-codes";
import { NavLink } from "react-router-dom"
import UsersService from '../../services/UsersService';
import UtilsService from "../../services/UtilsService";
const logo =  require("../../images/logo.png")

export const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("");
    const [isMessageSuccess, setIsMessageSuccess] = useState(false);

    const try_login = async() => {
        try{
            const response = await UsersService.login(username, password);
            if(response.status === StatusCodes.OK){
                sessionStorage.setItem("userToken", response.data);
                window.location.href = '/home';
            }
            else{
                UtilsService.display_message(response.data, false, setMessage, setIsMessageSuccess);
            }
        }
        catch(err){
            console.error(err);
        }
	}

    return(
        <div>
            <img src={logo} alt="logo" id="site_logo"></img>
            <h1 className="center_elem">Login</h1>
            <table className="medium_window center_elem border">
                <tbody>
                    <tr>
                        <td colSpan={2}><div className={isMessageSuccess ? "messageSuccess" : "messageError"}>{message}</div></td>
                    </tr>
                    <tr>
                        <td><label>Username:</label></td><td><input type="text" value={username} onChange={(newValue) => { setUsername(newValue.target.value)}}/></td>
                    </tr>
                    <tr>
                        <td><label>Password:</label></td><td><input type="password" value={password} onChange={(newValue) => { setPassword(newValue.target.value)}}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><label>Don't have an account? <NavLink to="/register">Register</NavLink></label></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><button onClick={try_login}>Login</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
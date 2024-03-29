import React, {useState} from "react";
import { StatusCodes } from "http-status-codes";
import UsersService from '../../services/UsersService';
import UtilsService from "../../services/UtilsService";
const logo =  require("../../images/logo.png")

export const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [message, setMessage] = useState("");
    const [isMessageSuccess, setIsMessageSuccess] = useState(false);


    const create_user = async() => {
        const response = await UsersService.create_user({username, password, fullName});
        if(response.status === StatusCodes.CREATED){
            let msg = "User created! Redirecting..."
            UtilsService.display_message(msg, true, setMessage, setIsMessageSuccess)
            setTimeout(() => {
                window.location.href = '/login';
            }, 1900)
        }
        else{
            UtilsService.display_message(response.data, false, setMessage, setIsMessageSuccess);
        }
    }

    return(
        <div>
            <img src={logo} alt="logo" id="site_logo"></img>
            <h1 className="center_elem">Register</h1>
            <table className="medium_window center_elem border">
                <tbody>
                    <tr>
                        <td colSpan={2}><div className={isMessageSuccess ? "messageSuccess" : "messageError"}>{message}</div></td>
                    </tr>
                    <tr>
                        <td><label>Username:</label></td><td><input type="text" value={username} onChange={(newValue) => { setUsername(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Password:</label></td><td><input type="password" value={password} onChange={(newValue) => { setPassword(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Full Name:</label></td><td><input type="text" value={fullName} onChange={(newValue) => { setFullName(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><button onClick={create_user}>Create</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
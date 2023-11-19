import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import UsersService from '../../services/UsersService';
const logo =  require("../../images/logo.png")

export const LoginPage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const try_login = async() => {
        try{
            const response = await UsersService.login(username, password);
            if(response.status === 200){
                sessionStorage.setItem("userToken", response.data);
                window.location.href = '/home';
            }
            else{
                // alert the error message coming from the server
                alert(response.data);
            }
        }
        catch(err){
            console.log(err);
        }
	}

    return(
        <div>
            <img src={logo} alt="logo" id="site_logo"></img>
            <h1 className="center_elem">Login</h1>
            <table className="medium_window center_elem border">
                <tbody>
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
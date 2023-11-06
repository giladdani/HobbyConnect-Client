import React, { useState, useEffect } from "react";
import UsersService from '../../services/UsersService'
// const UsersService = require("../../services/UsersService");

interface User {
    username: string,
    fullName: string,
    balance: string,
    role: string,
    creation_date: string
}

export const UserDetails = () => {
    const [user, setUser] = useState<null | User>(null);

    useEffect(() => {
        async function get_user() {
            const response = await UsersService.get_user_details(sessionStorage.getItem("userToken") || "");
            if(response.status === 200){
                setUser(response.data);
            }
            else{
                alert(response.data)
            }
        }
        get_user();
    }, [])

    return (
        <div>
            <h3 className="center_elem">{user ? user.username : ""}</h3>
            <table className="medium_window center_elem border">
                <tbody>
                    <tr>
                    <td><label>Full Name:</label></td><td><label>{user ? user.fullName : ""}</label></td>
                    </tr>
                    <tr>
                        <td><label>Balance:</label></td><td><label>${user ? user.balance : ""}</label></td>
                    </tr>
                    <tr>
                        <td><label>Role:</label></td><td><label>{user ? user.role : ""}</label></td>
                    </tr>
                    <tr>
                        <td><label>Date Joined:</label></td><td><label>{user ? user.creation_date : ""}</label></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
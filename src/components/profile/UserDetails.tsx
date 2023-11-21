import React from "react";
import UtilsService from "../../services/UtilsService";

export const UserDetails = ({user}:any) => {

    return (
        <div>
            <table className="medium_window center_elem border">
                <tbody>
                    <tr>
                        <td><label>Username:</label></td><td>{user ? user.username : ""}</td>
                    </tr>
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
                        <td><label>Date Joined:</label></td><td><label>{user ? user.creationDate : ""}</label></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
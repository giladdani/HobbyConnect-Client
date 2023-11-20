import React from "react";

export const UserDetails = ({user}:any) => {

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
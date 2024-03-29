import React, { useState } from 'react';
import { StatusCodes } from "http-status-codes";
import UsersService from '../../services/UsersService';
import UtilsService from '../../services/UtilsService';

export const GrantCredits = ({user, onCreditsGranted}:any) => {
	// const [username, setUsername] = useState("")
    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState("");
    const [isMessageSuccess, setIsMessageSuccess] = useState(false);

    const grant_credits = async() => {
        const response = await UsersService.add_user_balance(sessionStorage.getItem("userToken")||"", user.username, amount);
        if(response.status === StatusCodes.OK) {
            let msg = "Credit granted!";
            UtilsService.display_message(msg, true, setMessage, setIsMessageSuccess);
            onCreditsGranted(user.username);
        }
        else{
            UtilsService.display_message(response.data, false, setMessage, setIsMessageSuccess);
        }
    }

	return (
		<table className="center_elem">
            <tbody>
                {/* <tr><td>Username:</td><td><input type="text" value={username} onChange={(newValue) => { setUsername(newValue.target.value) }}/></td></tr> */}
                <tr>
                    <td>
                    <input type="number" value={amount} onChange={(newValue) => { setAmount(parseInt(newValue.target.value)) }}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button className="greenButton" value="Grant credits" onClick={grant_credits}>Grant credits</button>
                    </td>
                </tr>
                <tr><td colSpan={2}><div className={isMessageSuccess ? "messageSuccess" : "messageError"}>{message}</div></td></tr>
            </tbody>
        </table>
	)
}
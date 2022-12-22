import React, { useState } from 'react';
import UtilsService from '../../services/UtilsService';

export const GrantCredits = () => {
	const [username, setUsername] = useState("")
    const [amount, setAmount] = useState(0)

    const grant_credits = async() => {
        const response = await UtilsService.grant_credits(sessionStorage.getItem("userToken"), amount, username);
        if(response.status === 200) {
            alert("Credit granted!");
        }
        else{
            alert(response.data);
        }
    }

	return (
		<table>
            <tbody>
            <></>
                <tr><td>Username:</td><td><input type="text" value={username} onChange={(newValue) => { setUsername(newValue.target.value) }}/></td></tr>
                <tr><td>Amount:</td><td><input type="number" value={amount} onChange={(newValue) => { setAmount(newValue.target.value) }}/></td></tr>
                <tr><td><input type="button" value="Grant" onClick={grant_credits}/></td></tr>
            </tbody>
        </table>
	)
}
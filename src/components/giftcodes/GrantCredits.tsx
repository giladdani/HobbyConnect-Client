import React, { useState } from 'react';
import UsersService from '../../services/UsersService';

export const GrantCredits = () => {
	const [username, setUsername] = useState("")
    const [amount, setAmount] = useState("")

    const grant_credits = async() => {
        const response = await UsersService.add_user_balance(sessionStorage.getItem("userToken")||"", amount);
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
                <tr><td>Username:</td><td><input type="text" value={username} onChange={(newValue) => { setUsername(newValue.target.value) }}/></td></tr>
                <tr><td>Amount:</td><td><input type="number" value={amount} onChange={(newValue) => { setAmount(newValue.target.value) }}/></td></tr>
                <tr><td><input type="button" value="Grant" onClick={grant_credits}/></td></tr>
            </tbody>
        </table>
	)
}
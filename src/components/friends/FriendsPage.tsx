import React, { useState } from 'react';
const UsersService = require("../../services/UsersService");

export const FriendsPage = () => {
	const [username, setUsername] = useState("");
	
	const send_request = async() => {
		const response = await UsersService.send_friend_request(sessionStorage.getItem("userToken"), username);
        if(response.status === 201) {
            alert("Request sent!");
        }
        else{
            alert(response.data);
        }
	}

	return (
		<div>
            <table className="full_width center_elem">
                <tbody>
                    <tr>
                        <td>
                            <h2>Your Friends</h2>
                            {/* <FriendsViewer /> */}
                        </td>
                        <td>
                            <h2>Send Friend Request</h2>
							<input type="text" placeholder="Username" value={username} onChange={(newValue) => { setUsername(newValue.target.value) }} />
							<button onClick={send_request}>Send</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
	)
}
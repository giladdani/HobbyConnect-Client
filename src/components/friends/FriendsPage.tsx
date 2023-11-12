import React, { useState, useEffect } from "react";
import UsersService from '../../services/UsersService';
import { FriendRequestView } from "./FriendRequestView";

interface FriendRequest {
    sender: string,
    receiver: string,
    creationDate: string,
}

export const FriendsPage = () => {
	const [receiver, setReceiver] = useState("");
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);

    useEffect(() => {
        get_friends();
		get_friend_requests();
    }, [])

    const get_friend_requests = async() => {
        const response = await UsersService.get_friend_requests(sessionStorage.getItem("userToken") || "");
        if(response.status == 200){
            setFriendRequests(response.data);
        }
    }

    const get_friends = async() => {
        const response = await UsersService.get_friends(sessionStorage.getItem("userToken") || "");
        if(response.status == 200){
            setFriends(response.data);
        }
    }

	const send_request = async() => {
		const response = await UsersService.send_friend_request(sessionStorage.getItem("userToken")||"", receiver);
        if(response.status === 201) {
            alert("Request sent!");
        }
        else{
            alert(response.data);
        }
	}

    const onRequestAnswered = async(answer:Boolean, sender:any) => {
        const response = await UsersService.update_friend_request_status(sessionStorage.getItem("userToken")||"", sender, answer);
        if(response.status === 201) {
            alert("Done!");
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
                            <h2>Send Friend Request</h2>
							<input type="text" placeholder="username" value={receiver} onChange={(newValue) => { setReceiver(newValue.target.value) }} />
							<button onClick={send_request}>Send</button>
                        </td>
                        <td>
                            <h2>Your Friends</h2>
                            {friends.map((friendUsername:string, index) => {
                                return <div key={index}>
                                    {friendUsername}
                                </div>
                            })}
                        </td>
                        <td>
                            <h2>Pending requests</h2>
                            <div className="center_elem">
                                {friendRequests.map((request:FriendRequest, index) => {
                                    return <FriendRequestView request={request} onRequestAnswered={onRequestAnswered} key={index}></FriendRequestView>
                                })}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
	)
}
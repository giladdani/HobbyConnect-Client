import React, { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import UsersService from '../../services/UsersService';
import { FriendRequestView } from "./FriendRequestView";
import { FriendRequest } from "../../interfaces/FriendRequest";
import UtilsService from "../../services/UtilsService";

export const FriendsPage = () => {
	const [receiver, setReceiver] = useState("");
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [message, setMessage] = useState("");
    const [isMessageSuccess, setIsMessageSuccess] = useState(false);

    useEffect(() => {
        get_friends();
		get_friend_requests();
    }, [])

    const get_friend_requests = async() => {
        const response = await UsersService.get_friend_requests(sessionStorage.getItem("userToken") || "");
        if(response.status === StatusCodes.OK){
            setFriendRequests(response.data);
        }
    }

    const get_friends = async() => {
        const response = await UsersService.get_friends(sessionStorage.getItem("userToken") || "");
        if(response.status === StatusCodes.OK){
            setFriends(response.data);
        }
    }

	const send_request = async() => {
        let msg;
		const response = await UsersService.send_friend_request(sessionStorage.getItem("userToken")||"", receiver);
        if(response.status === StatusCodes.CREATED) {
            msg = "Request sent!";
            UtilsService.display_message(msg, true, setMessage, setIsMessageSuccess);
        }
        else if(response.status === StatusCodes.FORBIDDEN){
            msg = "Can't send request to yourself";
            UtilsService.display_message(msg, false, setMessage, setIsMessageSuccess);
        }
        else {
            UtilsService.display_message(response.data, false, setMessage, setIsMessageSuccess);
        }
	}

    const onRequestAnswered = async(answer:Boolean, sender:any) => {
        let msg;
        const response = await UsersService.update_friend_request_status(sessionStorage.getItem("userToken")||"", sender, answer);
        if(response.status === StatusCodes.CREATED) {
            msg = "Done!";
            UtilsService.display_message(msg, true, setMessage, setIsMessageSuccess);   
        }
        else{
            UtilsService.display_message(response.data, false, setMessage, setIsMessageSuccess);
        }
    }

	return (
		<div>
            <table className="full_width center_elem">
                <tbody>
                    <tr>
                        <td>
                            <h2>Send Friend Request</h2>
                            <div className={isMessageSuccess ? "messageSuccess" : "messageError"}>{message}</div>
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
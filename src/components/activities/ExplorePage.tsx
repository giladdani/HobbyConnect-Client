import React, { useState, useEffect } from 'react';
import ActivitiesService from '../../services/ActivitiesService';
import UsersService from '../../services/UsersService'
import { ActivityView } from './ActivityView';
import { Activity } from '../../interfaces/Activity';
import UtilsService from '../../services/UtilsService';

export const ExplorePage = () => {   
	const [activities, setActivities] = useState<Activity[]>([]);
    const [isOnlyFriends, setIsOnlyFriends] = useState(false);
    const [userBalance, setUserBalance] = useState(0);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [isMessageSuccess, setIsMessageSuccess] = useState(false);

	useEffect(() => {
        get_username();
        get_user_balance();
        get_activities();
    }, [])

    const get_username = async () => {
        const response = await UsersService.get_user_details(sessionStorage.getItem("userToken") || "");
        if(response.status === 200) {
            setUsername(response.data.username);
        }
        else{
            console.error(`Failed to get user, error: ${response.data}`)
        }
    }

    const get_activities = async () => {
        const response = await ActivitiesService.get_activities();
        if(response.status === 200){
            setActivities(JSON.parse(response.data));
        }
        else{
            console.error(`Failed to get activities, error: ${response.data}`)
        }
    }

    const get_user_balance = async () => {
        const response = await UsersService.get_user_balance(sessionStorage.getItem("userToken") || "");
        if(response.status === 200){
            setUserBalance(response.data.balance);
        }
        else{
            console.error(`Failed to get user balance, error: ${response.data}`)
        }
    }
    const is_only_friends_change = () => {
        setIsOnlyFriends(!isOnlyFriends);
    };

    const register = async(activity:any) => {
        if(userBalance < activity.price) {
            let msg = "Not enough balance";
            UtilsService.display_message(msg, false, setMessage, setIsMessageSuccess);
        }
        else{
            let msg;
            const response = await ActivitiesService.sign_user_to_activity(sessionStorage.getItem("userToken") || "", activity);
            if(response.status === 200){
                const priceNegative = (-1) * activity.price;
                await UsersService.add_user_balance(sessionStorage.getItem("userToken") || "", username, priceNegative);
                get_user_balance();
                get_activities();
                msg = "Signed up successfully";
                UtilsService.display_message(msg, true, setMessage, setIsMessageSuccess);
            }
            else if(response.status === 409){
                msg = "Activity is full";
                UtilsService.display_message(msg, false, setMessage, setIsMessageSuccess);
            }
            else{
                UtilsService.display_message(response.data, false, setMessage, setIsMessageSuccess);
            }
        }
    }

    const unregister = async(activity:any) => {
        let msg;
        const response = await ActivitiesService.remove_user_from_activity(sessionStorage.getItem("userToken") || "", activity);
            if(response.status === 200){
                await UsersService.add_user_balance(sessionStorage.getItem("userToken") || "", username, activity.price);
                get_user_balance();
                get_activities();
                msg = "Unregistered successfully"
                UtilsService.display_message(msg, true, setMessage, setIsMessageSuccess);
            }
            else{
                UtilsService.display_message(response.data, false, setMessage, setIsMessageSuccess);
            }
    }

	return (
		<div>
            <h1 className="center_elem">Explore activities</h1>
            <div className={isMessageSuccess ? "messageSuccess" : "messageError"}>{message}</div>
            <h3>Current balance: ${userBalance}</h3>

            {/* left column */}
            <div className="two_column">
                <table style={{width:'65%'}}>
                    <tbody>
                        <tr>
                            <td><h1>All activities</h1></td>
                            <td><input type="checkbox" checked={isOnlyFriends} onChange={is_only_friends_change}></input> Show only friends</td>
                        </tr>
                    </tbody>
                </table>
                {activities.map((activity, index) => (
                    <div className="border" key={index}>
                        <ActivityView activity={activity} />
                        {activity.participantsUsernames.includes(username) ? (
                            <button onClick={() => unregister(activity)} className="redButton">Unregister</button>) 
                            : (<button onClick={() => register(activity)} className="greenButton">Register</button>
                        )}
                    </div>
                ))}
            </div>

            {/* right column */}
            <div className="two_column">
                <h1>Your upcoming activities</h1>
                {activities.filter(activity => activity.participantsUsernames.includes(username))
                .map((activity, index) => (
                    <div key={index}>
                        {activity.title}<br />
                    </div>
                ))}
            </div>
        </div>
	)
}
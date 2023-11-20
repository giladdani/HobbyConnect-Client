import React, { useState, useEffect } from 'react';
import ActivitiesService from '../../services/ActivitiesService';
import UsersService from '../../services/UsersService'
import { ActivityView } from './ActivityView';
import { Activity } from '../../interfaces/Activity';

export const ExplorePage = () => {   
	const [activities, setActivities] = useState<Activity[]>([]);
    const [isOnlyFriends, setIsOnlyFriends] = useState(false);
    const [userBalance, setUserBalance] = useState(0);
    const [username, setUsername] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
            setErrorMessage("Not enough balance");
        }
        else{
            const response = await ActivitiesService.sign_user_to_activity(sessionStorage.getItem("userToken") || "", activity);
            if(response.status === 200){
                const priceNegative = (-1) * activity.price;
                await UsersService.add_user_balance(sessionStorage.getItem("userToken") || "", username, priceNegative);
                get_user_balance();
                get_activities();
                alert("Signed up successfully");
            }
            else if(response.status === 409){
                setErrorMessage("Activity is full");
            }
            else{
                setErrorMessage(response.data);
            }
        }
    }

    const unregister = async(activity:any) => {
        const response = await ActivitiesService.remove_user_from_activity(sessionStorage.getItem("userToken") || "", activity);
            if(response.status === 200){
                await UsersService.add_user_balance(sessionStorage.getItem("userToken") || "", username, activity.price);
                get_user_balance();
                get_activities();
                alert("Registration canceled");
            }
            else{
                setErrorMessage("Failed canceling registration");
            }
    }

	return (
		<div>
            <h1 className="center_elem">Explore activities</h1>
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}
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
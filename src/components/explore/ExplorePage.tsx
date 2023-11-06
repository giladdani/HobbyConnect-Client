import React, { useState, useEffect } from 'react';
import ActivitiesService from '../../services/ActivitiesService';
import UsersService from '../../services/UsersService'
import { ActivityView } from './ActivityView';

export const ExplorePage = () => {   
	const [activities, setActivities] = useState([]);
    const [isOnlyFriends, setIsOnlyFriends] = useState(false);
    const [userBalance, setUserBalance] = useState(0);

	useEffect(() => {
        // async function fetch_activities() {
        //     const response = await ActivitiesService.fetch_activities();
        //     if(response.status === 200){
        //         setActivities(JSON.parse(response.data));
        //     }
        //     else{
        //         alert(response.data)
        //     }
        // }

        // async function fetch_user_balance() {
        //     const response = await UsersService.get_user_balance(sessionStorage.getItem("userToken") || "");
        //     if(response.status === 200){
        //         setUserBalance(response.data.balance);
        //     }
        //     else{
        //         alert(response.data)
        //     }
        // }

        fetch_user_balance();
        fetch_activities();
    }, [])

    const fetch_activities = async () => {
        const response = await ActivitiesService.fetch_activities();
        if(response.status === 200){
            setActivities(JSON.parse(response.data));
        }
        else{
            alert(response.data)
        }
    }

    const fetch_user_balance = async () => {
        const response = await UsersService.get_user_balance(sessionStorage.getItem("userToken") || "");
        if(response.status === 200){
            setUserBalance(response.data.balance);
        }
        else{
            alert(response.data)
        }
    }
    const is_only_friends_change = () => {
        setIsOnlyFriends(!isOnlyFriends);
    };

    const sign_up = async(activity:any) => {
        if(userBalance < activity.price) {
            alert("Not enough balance");
        }
        else{
            const response = await ActivitiesService.sign_user_to_activity(sessionStorage.getItem("userToken") || "", activity);
            if(response.status == 200){
                const priceNegative = (-1) * activity.price;
                await UsersService.add_user_balance(sessionStorage.getItem("userToken") || "", priceNegative);
                fetch_user_balance();
                fetch_activities();
                alert("Signed up successfully.");
            }
            else{
                alert("Failed signing up.");
            }
        }
    }

	return (
		<div>
            <h1 className="center_elem">Explore activities</h1>
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
                        <button onClick={() => sign_up(activity)}>Sign up</button>
                    </div>
                ))}
            </div>

            {/* right column */}
            <div className="two_column">
                <h1>Your upcoming activities</h1>
                <p>show here</p>
            </div>
        </div>
	)
}
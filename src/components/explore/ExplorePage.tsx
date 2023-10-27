import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ActivitiesService from '../../services/ActivitiesService';
import UsersService from '../../services/UsersService'
import { ActivityView } from './ActivityView';

export const ExplorePage = () => {   
	const [activities, setActivities] = useState([]);
    const [isOnlyFriends, setIsOnlyFriends] = useState(false);
    const [userBalance, setUserBalance] = useState(0);

	useEffect(() => {
        async function fetch_activities() {
            const response = await ActivitiesService.fetch_activities();
            if(response.status === 200){
                setActivities(JSON.parse(response.data));
            }
            else{
                alert(response.data)
            }
        }

        async function fetch_user_balance() {
            const response = await UsersService.get_user_balance(sessionStorage.getItem("userToken") || "");
            if(response.status === 200){
                setUserBalance(response.data.balance);
            }
            else{
                alert(response.data)
            }
        }

        fetch_user_balance();
        fetch_activities();
    }, [])

    const OnIsOnlyFriendsChange = () => {
        setIsOnlyFriends(!isOnlyFriends);
      };

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
                            <td><input type="checkbox" checked={isOnlyFriends} onChange={OnIsOnlyFriendsChange}></input> Show only friends</td>
                        </tr>
                    </tbody>
                </table>
                {activities.map((activity, index) => (
                    <div className="border">
                        <ActivityView key={index} activity={activity} />
                        <button>Buy ticket</button>
                    </div>
                ))}
            </div>

            {/* right column */}
            <div className="two_column">
                <h2>Upcoming activities</h2>
                <p>show here</p>
            </div>
        </div>
	)
}
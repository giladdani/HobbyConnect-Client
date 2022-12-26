import React, { useState, useEffect } from 'react';
import { UsersService } from '../../services/UsersService'

export const FriendsViewer = (props) => {

    const [friends, setFriends] = useState([]);

	useEffect(() => {
        async function fetch_friends() {
            const response = await UsersService.get_friends(sessionStorage.getItem("userToken"));
            if(response.status === 200){
                setFriends(response.data);
            }
            else{
                alert(response.data)
            }
        }
        fetch_friends();
    }, [])

	const friendsList = friends.map((friend) => <li>{friend.username}</li>)

	return (
		<>
			<ul>
				{friendsList}
			</ul>
        </>
	)
}
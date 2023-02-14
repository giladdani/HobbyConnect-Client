import React, { useState, useEffect } from 'react';
const UsersService = require("../../services/UsersService");

interface Friend {
    username: string
}

export const FriendsViewer = () => {

    const [friends, setFriends] = useState<null | Friend[]>([]);

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

	const friendsList = friends ? friends.map((friend) => <li>{friend.username}</li> ) : []

	return (
		<>
			<ul>
				{friendsList}
			</ul>
        </>
	)
}
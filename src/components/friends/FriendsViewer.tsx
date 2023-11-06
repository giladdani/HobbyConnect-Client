import React, { useState, useEffect } from 'react';
import UsersService from '../../services/UsersService';
// const UsersService = require("../../services/UsersService");

interface Friend {
    username: string
}

export const FriendsViewer = () => {

    const [friends, setFriends] = useState<null | Friend[]>([]);

	const friendsList = friends ? friends.map((friend) => <li>{friend.username}</li> ) : []

	return (
		<>
			<ul>
				{friendsList}
			</ul>
        </>
	)
}
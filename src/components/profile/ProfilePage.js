import React, {useEffect, useState} from 'react';
import UsersService from '../../services/UsersService';

export const ProfilePage = () => {
	const [user, setUser] = useState({});

	useEffect(() => {
		async function fetch_user() {
			const response = await UsersService.get_user_details(sessionStorage.getItem("userToken"));
			setUser(response.user);
		}
		fetch_user();
	}, [])

	return (
		<div>
            <h1 className="center_elem">{user.username}</h1>
            <table className="medium_window center_elem border">
            	<tbody>
            	    <tr>
                       <td><label>Full Name:</label></td><td><label>{user.fullName}</label></td>
    	            </tr>
            	    {/* <tr>
 						<td><label>ID:</label></td><td><label>{user.id}</label></td>
            	    </tr> */}
            	    <tr>
 						<td><label>Role:</label></td><td><label>{user.role}</label></td>
            	    </tr>
                    <tr>
 						<td><label>Date Joined:</label></td><td><label>{user.creation_date}</label></td>
            	    </tr>
            	</tbody>
            </table>
        </div>
	)
}

// class About extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
//             user: {},
// 			user_token: extract_token_from_cookie()
//         }
// 	}

// 	async componentDidMount() {
// 		const user_permissions = await verify_page_access();
// 		if(user_permissions.includes("admin")){
// 			this.setState({navbar_mode: "full"});
// 		}
// 		else if(user_permissions.includes("user")){
// 			this.setState({navbar_mode: "normal"});
// 		}

//         const user = await this.get_user_details();
// 		this.setState({user: user});
// 	}
import { UserDetails } from './UserDetails';
import { RedeemGiftCode } from '../giftcodes/RedeemGiftCode';
import React, { useState, useEffect } from "react";
import UsersService from '../../services/UsersService'
import { User } from '../../interfaces/User';

export const ProfilePage = () => {
	const [user, setUser] = useState<null | User>(null);

	useEffect(() => {
		get_user();
    }, [])

	async function get_user() {
		const response = await UsersService.get_user_details(sessionStorage.getItem("userToken") || "");
		if(response.status === 200){
			setUser(response.data);
		}
		else{
			alert(response.data)
		}
	}

	return (
		<>
			<table className="full_width center_elem">
				<tbody>
					<tr>
						<td>
							<h2>User Details</h2>
							<UserDetails user={user}/>
						</td>
						<td>
							<h2>Redeem Gift Code</h2>
							<RedeemGiftCode OnCodeRedeemed={get_user}/>
						</td>
					</tr>
				</tbody>
			</table>
        </>
	)
}
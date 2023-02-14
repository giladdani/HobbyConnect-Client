import React from 'react';
import { UserDetails } from './UserDetails';
import { RedeemGiftCode } from '../giftcodes/RedeemGiftCode';

export const ProfilePage = () => {
	return (
		<>
			<table className="full_width center_elem">
				<tbody>
					<tr>
						<td>
							<h2>User Details</h2>
							<UserDetails />
						</td>
						<td>
							<h2>Redeem Gift Code</h2>
							<RedeemGiftCode />
						</td>
					</tr>
				</tbody>
			</table>
        </>
	)
}
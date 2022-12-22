import React, { useState } from 'react';
import UtilsService from '../../services/UtilsService';

export const RedeemGiftCode = () => {
	const [code, setCode] = useState("")

    const redeem_code = async() => {
        const response = await UtilsService.redeem_gift_code(sessionStorage.getItem("userToken"), code);
        if(response.status === 200) {
            alert("Code redeemed successfully!");
        }
        else{
            alert(response.data);
        }
    }

	return (
		<>
            <input type="text" value={code} onChange={(newValue) => { setCode(newValue.target.value) }}></input>
            <input type="button" value="Generate" onClick={redeem_code}></input>
        </>
	)
}
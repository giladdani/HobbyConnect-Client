import React, { useState } from 'react';
import UtilsService from '../../services/UtilsService'

export const RedeemGiftCode = ({OnCodeRedeemed}:any) => {
	const [code, setCode] = useState("")
    const [message, setMessage] = useState("");
    const [isMessageSuccess, setIsMessageSuccess] = useState(false);

    const redeem_code = async() => {
        let msg;
        const response = await UtilsService.redeem_gift_code(sessionStorage.getItem("userToken")||"", code);
        if(response.status === 200) {
            msg = "Code redeemed successfully!";
            UtilsService.display_message(msg, true, setMessage, setIsMessageSuccess);
            OnCodeRedeemed();
        }
        else{
            UtilsService.display_message(response.data, false, setMessage, setIsMessageSuccess);
        }
    }

	return (
		<>
            <input type="text" value={code} onChange={(newValue) => { setCode(newValue.target.value) }}></input>
            <input type="button" value="Redeem" onClick={redeem_code}></input>
        </>
	)
}
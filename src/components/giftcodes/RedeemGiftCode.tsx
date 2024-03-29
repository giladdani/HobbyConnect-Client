import React, { useState } from 'react';
import { StatusCodes } from "http-status-codes";
import UtilsService from '../../services/UtilsService'

export const RedeemGiftCode = ({OnCodeRedeemed}:any) => {
	const [code, setCode] = useState("")
    const [message, setMessage] = useState("");
    const [isMessageSuccess, setIsMessageSuccess] = useState(false);

    const redeem_code = async() => {
        let msg;
        const response = await UtilsService.redeem_gift_code(sessionStorage.getItem("userToken")||"", code);
        if(response.status === StatusCodes.OK) {
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
            <div className={isMessageSuccess ? "messageSuccess" : "messageError"}>{message}</div>
            <input type="text" value={code} onChange={(newValue) => { setCode(newValue.target.value) }}></input>
            <input type="button" value="Redeem" onClick={redeem_code}></input>
        </>
	)
}
import React, { useState } from "react";
import UtilsService from '../../services/UtilsService'
import { GiftCode } from '../../interfaces/GiftCode'

export const GenerateGiftCode = ({onGiftCodeCreated}:any) => {
    const [generatedGiftCode, setGeneratedGiftCode] = useState<GiftCode>();
    const [selectedValue, setSelectedValue] = useState(1);
    const [message, setMessage] = useState("");
    const [isMessageSuccess, setIsMessageSuccess] = useState(false);

    const generate_code = async() => {
        const response = await UtilsService.generate_gift_code(sessionStorage.getItem("userToken") || "", selectedValue);
        if(response.status === 200){
            setGeneratedGiftCode(response.data);
        }
        else{
            UtilsService.display_message(response.data, false, setMessage, setIsMessageSuccess);
        }
    }

    const insert_code = async () => {
        let msg;
        if(generatedGiftCode) {
            const response = await UtilsService.insert_gift_code(sessionStorage.getItem("userToken")||"", generatedGiftCode.code, generatedGiftCode.value);
            if(response.status === 201){
                msg = "Code inserted."
                UtilsService.display_message(response.data, true, setMessage, setIsMessageSuccess);
                onGiftCodeCreated();
            }
            else{
                UtilsService.display_message(response.data, false, setMessage, setIsMessageSuccess);
            }
        }
        else {
            msg = "No gift code generated yet";
            UtilsService.display_message(msg, true, setMessage, setIsMessageSuccess);
        }
    }

    return (
        <table className="center_elem">
            <tbody>
                <tr>
                    <td colSpan={2}><div className={isMessageSuccess ? "messageSuccess" : "messageError"}>{message}</div></td>
                </tr>
                <tr>
                    <td>
                        <select value={selectedValue} onChange={(newValue) => { setSelectedValue(parseInt(newValue.target.value))}}>
                            <option value={1}>$1</option>
                            <option value={5}>$5</option>
                            <option value={20}>$20</option>
                            <option value={50}>$50</option>
                            <option value={100}>$100</option>
                        </select>
                        <button onClick={generate_code}>Generate</button>
                        <button onClick={insert_code} disabled={!generatedGiftCode}>Confirm</button>
                    </td>
                </tr>
                <tr>
                    <td>Code: <input type="text" value={generatedGiftCode?.code ?? ""} readOnly></input></td>
                </tr>
                <tr>
                    <td>Value: <input type="text" value={generatedGiftCode?.value ?? ""} readOnly></input></td>
                </tr>
            </tbody>
        </table>
    )
}
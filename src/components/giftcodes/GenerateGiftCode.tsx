import React, { useState } from "react";
import UtilsService from '../../services/UtilsService'
import { GiftCode } from '../../interfaces/GiftCode'

export const GenerateGiftCode = ({onGiftCodeCreated}:any) => {
    const [generatedGiftCode, setGeneratedGiftCode] = useState<GiftCode>();
    const [selectedValue, setSelectedValue] = useState(1);

    const generate_code = async() => {
        const response = await UtilsService.generate_gift_code(sessionStorage.getItem("userToken") || "", selectedValue);
        if(response.status === 200){
            setGeneratedGiftCode(response.data);
        }
        else{
            alert(response.data);
        }
    }

    const insert_code = async () => {
        if(generatedGiftCode) {
            const response = await UtilsService.insert_gift_code(sessionStorage.getItem("userToken")||"", generatedGiftCode.code, generatedGiftCode.value);
            if(response.status === 201){
                alert("Code inserted.")
                onGiftCodeCreated();
            }
            else{
                alert(response.data);
            }
        }
        else {
            alert("No gift code generated yet");
        }
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <button onClick={generate_code}>Generate</button>
                        <button onClick={insert_code} disabled={!generatedGiftCode}>Confirm</button>
                        <select value={selectedValue} onChange={(newValue) => { setSelectedValue(parseInt(newValue.target.value))}}>
                            <option value={1}>$1</option>
                            <option value={5}>$5</option>
                            <option value={20}>$20</option>
                            <option value={50}>$50</option>
                            <option value={100}>$100</option>
                        </select>
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
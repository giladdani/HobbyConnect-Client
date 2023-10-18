import React, { useState } from "react";
import UtilsService from '../../services/UtilsService'

interface GiftCodeResponse {
    status: number;
    data: {
        code: string;
        amount: number;
    };
}


export const GenerateGiftCode = () => {
    const [code, setCode] = useState("");
    const [codeValue, setCodeValue] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState(1);

    const generate_code = async() => {
        const response:GiftCodeResponse = await UtilsService.generate_gift_code(sessionStorage.getItem("userToken")||"", selectedAmount);
        if(response.status === 200){
            setCode(response.data.code);
            setCodeValue(response.data.amount)
        }
        else{
            alert(response.data);
        }
    }

    const insert_code = async () => {
        const response = await UtilsService.insert_gift_code(sessionStorage.getItem("userToken")||"", code, codeValue);
        if(response.status === 201){
            alert("Code inserted.")
        }
        else{
            alert(response.data);
        }
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <button onClick={generate_code}>Generate</button>
                        <button onClick={insert_code} disabled={code === ''}>Confirm </button>
                        <select value={selectedAmount} onChange={(newValue) => { setSelectedAmount(parseInt(newValue.target.value))}}>
                            <option value={1}>$1</option>
                            <option value={5}>$5</option>
                            <option value={20}>$20</option>
                            <option value={50}>$50</option>
                            <option value={100}>$100</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Code: <input type="text" value={code} readOnly></input></td>
                </tr>
                <tr>
                    <td>Value: <input type="text" value={codeValue} readOnly></input></td>
                </tr>
            </tbody>
        </table>
    )
}
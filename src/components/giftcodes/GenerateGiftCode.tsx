import React, { useState } from "react";
import UtilsService from '../../services/UtilsService'

export const GenerateGiftCode = () => {

    const [code, setCode] = useState("");
    const [selectedAmount, setSelectedAmount] = useState(1);

    const generate_code = async() => {
        const response = await UtilsService.generate_gift_code(sessionStorage.getItem("userToken")||"", selectedAmount);
        if(response.status === 201){
            setCode(response.data);
        }
        else{
            alert(response.data);
        }
    }

    return (
        <table>
            <tbody>
                <tr>
                    <td><input type="text" value={code} readOnly></input></td>
                    <td>
                        <select value={selectedAmount} onChange={(newValue) => { setSelectedAmount(parseInt(newValue.target.value))}}>
                        <option value={1}>$1</option>
                        <option value={5}>$5</option>
                        <option value={20}>$20</option>
                        <option value={50}>$50</option>
                        <option value={100}>$100</option>
                        </select>
                    </td>
                </tr>
                <tr><td><button onClick={generate_code}>Generate</button></td></tr>
            </tbody>
        </table>
    )
}
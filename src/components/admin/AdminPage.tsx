import React, { useState, useEffect } from "react";
import { GenerateGiftCode } from "../giftcodes/GenerateGiftCode";
import { GrantCredits } from "../giftcodes/GrantCredits";
import UtilsService from "../../services/UtilsService";
import { GiftCode } from "../../interfaces/GiftCode";

export const AdminPage = () => {
    const [giftCodes, setGiftCodes] = useState([]);

    useEffect(() => {
        get_gift_codes();
    }, [])

    const get_gift_codes = async() => {
        const response = await UtilsService.get_gift_codes(sessionStorage.getItem("userToken")||"");
        if(response.status === 200) {
            setGiftCodes(response.data);
        }
        else{
            alert("Error on fetch gift codes");
        }
    }

    const onGiftCodeCreated = () => {
        get_gift_codes();
    }
    return(
        <div>
            <h1 className="center_elem">Admin Console</h1>
            <table className="full_width center_elem">
                <tbody>
                    <tr>
                        <td>
                            <h2>Manage Users</h2>
                        </td>
                        <td>
                            <h2>Grant Credits</h2>
                            <GrantCredits />
                        </td>
                        <td>
                            <h2>Generate Gift Code</h2>
                            <GenerateGiftCode onGiftCodeCreated={onGiftCodeCreated}/>
                            <h2>Existing Gift Codes</h2>
                            {giftCodes.map((code:GiftCode, index) => {
                                    return <div key={index}>{code.code} (${code.value})</div>
                                })}
                        </td> 
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
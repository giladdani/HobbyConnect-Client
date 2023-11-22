import React, { useState, useEffect } from "react";
import { StatusCodes } from "http-status-codes";
import { GenerateGiftCode } from "../giftcodes/GenerateGiftCode";
import { GrantCredits } from "../giftcodes/GrantCredits";
import UtilsService from "../../services/UtilsService";
import UsersService from "../../services/UsersService";
import { GiftCode } from "../../interfaces/GiftCode";
import { User } from "../../interfaces/User";
import ManageUsers from "./ManageUsers";

export const AdminPage = () => {
    const [giftCodes, setGiftCodes] = useState([]);
    // const [users, setUsers] = useState([]);

    useEffect(() => {
        // get_users();
        get_gift_codes();
    }, [])

    // const get_users = async() => {
    //     const response = await UsersService.get_users(sessionStorage.getItem("userToken")||"");
    //     if(response.status === StatusCodes.OK) {
    //         setUsers(response.data);
    //     }
    //     else{
    //         console.error("Error on fetch users");
    //     }
    // }

    const get_gift_codes = async() => {
        const response = await UtilsService.get_gift_codes(sessionStorage.getItem("userToken")||"");
        if(response.status === StatusCodes.OK) {
            setGiftCodes(response.data);
        }
        else{
            console.error("Error on fetch gift codes");
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
                            <ManageUsers />
                        </td>
                        <td>
                            <h2>Generate Gift Code</h2>
                            <GenerateGiftCode onGiftCodeCreated={onGiftCodeCreated}/>
                            <p><b><u>Existing Gift Codes:</u></b></p>
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
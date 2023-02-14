import React from "react";
import { GenerateGiftCode } from "../giftcodes/GenerateGiftCode";
import { GrantCredits } from "../giftcodes/GrantCredits";

export const AdminPage = () => {
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
                            <GenerateGiftCode />
                        </td> 
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
import React, { useState } from "react";



export const FriendRequestView = ({request, onRequestAnswered}:any) => {
    return (
        <div>
            <table className="center_elem">
                <tbody>
                    <tr>
                        <td><b>From</b>: {request.sender}</td>
                    </tr>
                    <tr>
                        <td><b>When</b>: {request.creationDate}</td>
                    </tr>
                    <tr>
                        <td><button className="greenButton" onClick={() => onRequestAnswered(true, request.sender)}>Accept</button></td>
                        <td><button className="redButton" onClick={() => onRequestAnswered(false, request.sender)}>Decline</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
      );
}
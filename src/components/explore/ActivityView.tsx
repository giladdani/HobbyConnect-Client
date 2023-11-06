import React, { useState } from "react";



export const ActivityView = ({activity}:any) => {
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><b>Title</b>: {activity.title}</td>
                    </tr>
                    <tr>
                        <td><b>Description</b>: {activity.description}</td>
                    </tr>
                    <tr>
                        <td><b>Creator</b>: {activity.creator}</td>
                    </tr>
                    <tr>
                        <td><b>Category</b>: {activity.category}</td>
                    </tr>
                    <tr>
                        <td><b>Time</b>: {activity.time}</td>
                    </tr>
                    <tr>
                        <td><b>Location</b>: {activity.location}</td>
                    </tr>
                    <tr>
                        <td><b>Price</b>: ${activity.price}</td>
                    </tr>
                    <tr>
                        <td><b>Participants</b>: {activity.participantsUsernames.length}/{activity.totalParticipants}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      );
}
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import EventsService from "../../services/EventsService";
import { CreateEvent } from "./CreateEvent"
// const GamesService = require("../../services/GamesService");

export const EventsPage = () => {
    const [events, setEvents] = useState([]);

	useEffect(() => {
        async function fetch_events() {
            const response = await EventsService.fetch_events();
            if(response.status === 200){
                setEvents(JSON.parse(response.data));
            }
            else{
                alert(response.data)
            }
        }
        fetch_events();
    }, [])

    return (
        <div>
            <h1 className="center_elem">Events</h1>
            <table className="full_width center_elem">
                <tbody>
                    <tr>
                        <td>
                            <h2>Available Events</h2>
                            <ul>
                                {events && events.map((event:any, index) => <li key={index}>{event.title}</li>)}
                            </ul>
                        </td>
                        <td>
                            <h2>Create Event</h2>
                            <CreateEvent/>
                        </td>
                    </tr>
                </tbody>
            </table>
		</div>
    )
}
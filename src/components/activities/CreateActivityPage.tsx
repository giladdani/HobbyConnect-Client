import React, {useState} from "react";
import ActivitiesService from '../../services/ActivitiesService';

const logo =  require("../../images/logo.png")

export const CreateActivityPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    // const [dateTime, setDateTime] = useState(new Date())
    const [dateTime, setDateTime] = useState("")
    const [location, setLocation] = useState("")
    const [ticketPrice, seTicketPrice] = useState(0)
    const [totalTickets, setTotalTickets] = useState(0)

    const createActivity = async() => {
        const response = await ActivitiesService.create_activity({title, description, category, dateTime, location, ticketPrice, totalTickets}, sessionStorage.getItem("userToken") || "");
        if(response.status === 201){
            alert("Activity created!");
        }
        else{
            alert(response.data);
        }
    }

    return(
        <div>
            <h1 className="center_elem">Create activity</h1>
            <table className="medium_window center_elem">
                <tbody>
                    <tr>
                        <td><label>Title:</label></td><td><input type="text" value={title} onChange={(newValue) => { setTitle(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Description:</label></td><td><textarea value={description} onChange={(newValue) => { setDescription(newValue.target.value) }}></textarea></td>
                    </tr>
                    <tr>
                        <td><label>Category:</label></td><td><input type="text" value={category} onChange={(newValue) => { setCategory(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Date & Time:</label></td><td><input type="datetime-local" value={dateTime} onChange={(newValue) => { setDateTime(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Location:</label></td><td><input type="text" value={location} onChange={(newValue) => { setLocation(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Ticket Price:</label></td><td><input type="number" value={ticketPrice} onChange={(newValue) => { seTicketPrice(parseInt(newValue.target.value)) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Total Tickets:</label></td><td><input type="number" value={totalTickets} onChange={(newValue) => { setTotalTickets(parseInt(newValue.target.value)) }}></input></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><button onClick={createActivity}>Create</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
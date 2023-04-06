import React, {useState} from "react";
import DatePicker from 'react-date-picker'
import EventsService from '../../services/EventsService';
const logo =  require("../../images/logo.png")

export const CreateEvent = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [time, setTime] = useState(new Date())
    const [location, setLocation] = useState("")
    const [ticketPrice, seTicketPrice] = useState(0)
    const [totalTickets, setTotalTickets] = useState(0)

    const create_event = async() => {
        const response = await EventsService.create_event({title, description, category, time, location, ticketPrice, totalTickets}, sessionStorage.getItem("userToken") || "");
        if(response.status === 201){
            alert("Event created!");
        }
        else{
            alert(response.data);
        }
    }

    return(
        <div>
            <table className="medium_window center_elem">
                <tbody>
                    <tr>
                        <td><label>Title:</label></td><td><input type="text" value={title} onChange={(newValue) => { setTitle(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Description:</label></td><td><input type="text" value={description} onChange={(newValue) => { setDescription(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Category:</label></td><td><input type="text" value={category} onChange={(newValue) => { setCategory(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Time:</label></td><td><DatePicker onChange={setTime} value={time}/></td>
                    </tr>
                    {/* <tr>
                        <td><label>Time:</label></td><td><input type="date" value={time} onChange={(newValue) => { setTime(new Date(newValue.target.value)) }}></input></td>
                    </tr> */}
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
                        <td colSpan={2}><button onClick={create_event}>Create</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
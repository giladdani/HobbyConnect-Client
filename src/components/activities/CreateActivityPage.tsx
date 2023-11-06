import React, {useState} from "react";
import ActivitiesService from '../../services/ActivitiesService';

const logo =  require("../../images/logo.png")

export const CreateActivityPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [dateTime, setDateTime] = useState("")
    const [location, setLocation] = useState("")
    const [totalParticipants, setTotalParticipants] = useState(0)
    const [isPaid, setIsPaid] = useState(false);
    const [price, setPrice] = useState(0)

    const create_activity = async() => {
        let finalPrice = isPaid ? price : 0;
        const response = await ActivitiesService.create_activity({title, description, category, dateTime, location, totalParticipants, price: finalPrice}, sessionStorage.getItem("userToken") || "");
        if(response.status === 201){
            alert("Activity created!");
        }
        else{
            alert(response.data);
        }
    }

    const is_paid_change = () => {
        setIsPaid(!isPaid);
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
                        <td><label>When:</label></td><td><input type="datetime-local" value={dateTime} onChange={(newValue) => { setDateTime(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Location:</label></td><td><input type="text" value={location} onChange={(newValue) => { setLocation(newValue.target.value) }}></input></td>
                    </tr>
                    <tr>
                        <td><label>Number of participants:</label></td><td><input type="number" value={totalParticipants} onChange={(newValue) => { setTotalParticipants(parseInt(newValue.target.value)) }}></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="isPaidCheckbox">Is paid?</label><input type="checkbox" id="isPaidCheckbox" checked={isPaid} onChange={is_paid_change}></input></td>
                    </tr>
                    <tr hidden={!isPaid}>
                        <td><label>Price:</label></td><td><input type="number" value={price} onChange={(newValue) => { setPrice(parseInt(newValue.target.value)) }}></input></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><button onClick={create_activity}>Create</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import ActivitiesService from '../../services/ActivitiesService';;

interface Activity {
    name: string,
    description_raw: string,
    released: string,
    rating: string,
    background_image: string
}

export const ActivityDetailsPage = () => {
    const { id } = useParams();   // get activity id from url
    const [activity, setActivity] = useState<null | Activity>(null);

	useEffect(() => {
        async function fetch_activity_data(id:any) {
            const response = await ActivitiesService.fetch_activity_by_id(id);
            if(response.status === 200){
                setActivity(JSON.parse(response.data));
            }
            else{
                alert(response.data)
            }
        }
        fetch_activity_data(id);
    })

	return (
		<div>
            {activity && 
            <table>
                <tbody>
                    <tr><td>Name:</td><td> {activity.name}</td></tr>
                    <tr><td>Description:</td><td>{activity.description_raw}</td></tr>
                </tbody>
            </table>}
		</div>
	)
}
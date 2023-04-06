import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import ActivitiesService from '../../services/ActivitiesService';

interface Activity {
    id: number,
    name: string
}

export const ExplorePage = () => {   
	const [activities, setActivities] = useState<null | Activity[]>([]);

	useEffect(() => {
        async function fetch_activities() {
            const response = await ActivitiesService.fetch_activities();
            if(response.status === 200){
                setActivities(JSON.parse(response.data));
            }
            else{
                alert(response.data)
            }
        }
        fetch_activities();
    }, [])

	return (
		<div>
            <h1 className="center_elem">Explore</h1>
            {/* This will contain a list of activities (categories are: Events, Lessons, Meetups etc.)
            each item will have a category, location, time, organizer, current number of participants
            and the list can be sorted/filtered by these parameters */}
		</div>
	)
}
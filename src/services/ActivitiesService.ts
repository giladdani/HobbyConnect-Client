interface Activity {
    title: string,
    description: string,
    category: string,
    dateTime: any,
    location: string,
    ticketPrice: number,
    totalTickets: number
}

async function fetch_activities() {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/activities`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })

    const data = await response.text();
    return {status: response.status, data};
}

async function fetch_activity_by_id(id:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/activities/${id}`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'GET'
    })

    const data = await response.text();
    return {status: response.status, data};
}

async function create_activity(activity:Activity, userToken:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/activities`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({title: activity.title, description: activity.description, category: activity.category, time: activity.dateTime, location: activity.location, ticket_price: activity.ticketPrice, tickets_left: activity.totalTickets})
    })
    const data = await response.text();
    return {status: response.status, data};
}

const ActivitiesService = {
    fetch_activities,
    fetch_activity_by_id,
    create_activity
}
export default ActivitiesService;
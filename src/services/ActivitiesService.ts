async function get_activities() {
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

async function get_activity_by_id(id:string) {
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

async function create_activity(activity:any, userToken:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/activities`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({title: activity.title, description: activity.description, category: activity.category, time: activity.dateTime, location: activity.location, price: activity.price, totalParticipants: activity.totalParticipants})
    })
    const data = await response.text();
    return {status: response.status, data};
}

async function sign_user_to_activity(userToken:string, activity:any){
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/activities/register`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({activity: activity})
    })
    const data = await response.text();
    return {status: response.status, data};
}

async function remove_user_from_activity(userToken:string, activity:any){
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/activities/unregister`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({activity: activity})
    })
    const data = await response.text();
    return {status: response.status, data};
}

const ActivitiesService = {
    get_activities,
    get_activity_by_id,
    create_activity,
    sign_user_to_activity,
    remove_user_from_activity
}
export default ActivitiesService;
interface Event {
    title: string,
    description: string,
    category: string,
    time: Date,
    location: string,
    ticketPrice: number,
    totalTickets: number
}

async function fetch_events() {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/events`,
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

async function fetch_event_data(id:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/events/${id}`,
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

async function create_event(event:Event, userToken:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${process.env.REACT_APP_SERVER_PORT}/api/events`,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': userToken
        },
        method: 'POST',
        body: JSON.stringify({title: event.title, description: event.description, category: event.category, time: event.time, location: event.location, ticket_price: event.ticketPrice, tickets_left: event.totalTickets})
    })
    const data = await response.text();
    return {status: response.status, data};
}

const EventsService = {
    fetch_events,
    fetch_event_data,
    create_event
}
export default EventsService;

// module.exports = {
//     fetch_games,
//     fetch_game_data
// }
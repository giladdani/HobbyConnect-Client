// TODO: make URL const
async function fetch_games() {
    const response = await fetch('http://localhost:2718/api/games',
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

async function fetch_game_data(id) {
    const response = await fetch(`http://localhost:2718/api/games/${id}`,
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

module.exports = {
    fetch_games,
    fetch_game_data
}
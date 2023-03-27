// TODO: make URL const
async function fetch_games() {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/api/games`,
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

async function fetch_game_data(id:string) {
    const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}:${process.env.REACT_APP_SERVER_PORT}/api/games/${id}`,
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

const GamesService = {
    fetch_games,
    fetch_game_data
}
export default GamesService;

// module.exports = {
//     fetch_games,
//     fetch_game_data
// }
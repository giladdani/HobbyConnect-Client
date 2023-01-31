import React, { useState, useEffect } from 'react';
import GamesService from '../../services/GamesService';

export const GamesPage = () => {
    const [games, setGames] = useState([]);

	useEffect(() => {
        async function fetch_games() {
            const response = await GamesService.fetch_games();
            if(response.status === 200){
                setGames(JSON.parse(response.data));
            }
            else{
                alert(response.data)
            }
        }
        fetch_games();
    }, [])

	return (
		<div>
            <h1 className="center_elem">Games</h1>
			<ul>
                {games && games.map((game, index) => <li key={index}>{game.name}</li>)}
            </ul>
		</div>
	)
}
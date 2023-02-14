import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
const GamesService = require("../../services/GamesService");

interface Game {
    id: number,
    name: string
}

export const GamesPage = () => {
    const [games, setGames] = useState<null | Game[]>([]);

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
                {games && games.map((game, index) => <li key={index}><Link to={`${game.id}`}>{game.name}</Link></li>)}
            </ul>
		</div>
	)
}
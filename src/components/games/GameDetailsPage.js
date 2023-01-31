import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import GamesService from '../../services/GamesService';

export const GameDetailsPage = () => {
    const { id } = useParams();   // get game id from url
    const [game, setGame] = useState([]);

	useEffect(() => {
        async function fetch_game_data(id) {
            const response = await GamesService.fetch_game_data(id);
            if(response.status === 200){
                setGame(JSON.parse(response.data));
            }
            else{
                alert(response.data)
            }
        }
        fetch_game_data(id);
    }, [])

	return (
		<div>
            {game && 
            <table>
                <tbody>
                    <tr><td>Name:</td><td> {game.name}</td></tr>
                    <tr><td>Description:</td><td>{game.description_raw}</td></tr>
                    <tr><td>Release date:</td><td>{game.released}</td></tr>
                    <tr><td>Rating:</td><td>{game.rating}</td></tr>
                    <tr><td><img className='game_image' src={game.background_image}/></td></tr>
                </tbody>
            </table>}
		</div>
	)
}
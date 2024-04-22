import React from 'react';
import { Button } from './generic-components/Button';
import { removeFavorite } from '../redux/actions/actions';
import { useDispatch } from 'react-redux';

export const MovieCard = ({ movies, handleMovieDetail, isFavorite }) => {
	const dispatch = useDispatch();

	const handleRemoveFavorite = (id) => {
		dispatch(removeFavorite(id));
	};

	return (
		<div className="bg-[#000000] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 w-[400px] sm:w-full">
			{movies.length > 0
				? movies.map((movie) => (
						<div
							key={movie.id}
							className="flex justify-center rounded-lg m-4 shadow-lg bg-[#222831] backdrop-blur-lg"
						>
							<div className="flex flex-col items-center text-[white]">
								<div
									className="flex flex-col items-center text-[white]"
									onClick={() => {
										handleMovieDetail(movie.id);
									}}
								>
									<p className="">{movie.title}</p>
									<img
										src={movie?.image}
										alt={'image' + movie.id}
										className="rounded-lg"
									/>
									<p>Rating: {movie.vote_average}</p>
								</div>
								{isFavorite ? (
									<Button
										value={'Remove from List'}
										onClick={() => handleRemoveFavorite(movie.id)}
										className="text-[black] bg-[#DDDDDD] rounded-md h-[40px] p-2 flex items-center justify-center m-2"
									/>
								) : null}
							</div>
						</div>
				  ))
				: null}
		</div>
	);
};

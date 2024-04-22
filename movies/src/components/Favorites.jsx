import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MovieCard } from './MovieCard';
import {
	cleanMovieDetail,
	getMovieDetailById,
	getReviewByMovieId,
} from '../redux/actions/actions';
import { Link, useNavigate } from 'react-router-dom';

export const Favorites = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const favorites = useSelector((state) => state.reducer.favorites);
	const isLogged = useSelector((state) => state.reducer.logged);

	const handleMovieDetail = (id) => {
		dispatch(cleanMovieDetail());
		dispatch(getMovieDetailById(id));
		dispatch(getReviewByMovieId(id));
		navigate(`/movies/${id}`);
	};

	return (
		<div className='flex justify-center h-screen'>
			{isLogged ? (
				<div className="">
					{favorites.length > 0 ? (
						<div className="">
							<MovieCard
								movies={favorites || []}
								handleMovieDetail={handleMovieDetail}
								isFavorite={true}
							/>
						</div>
					) : null}
				</div>
			) : (
				<div className="text-[white] text-center flex justify-center items-center h-screen">
					<div className="flex flex-col justify-center items-center">
						<h1 className="m-4">
							You need to Log In to See your Favorite List
						</h1>
						<button className="bg-[#DDDDDD] text-[black] rounded-md h-[40px] p-2 flex items-center justify-center">
							<Link to="/login">Go To Log In</Link>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

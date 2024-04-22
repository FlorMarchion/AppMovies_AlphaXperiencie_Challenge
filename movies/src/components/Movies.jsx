import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	cleanMovieDetail,
	getAllPopularMovies,
	getMovieDetailById,
	getReviewByMovieId,
} from '../redux/actions/actions';
import { useNavigate } from 'react-router-dom';
import { MovieCard } from './MovieCard';

export const Movies = ({ props }) => {
	const dispatch = useDispatch();
	const popularMovies = useSelector((state) => state.reducer.popularMovies);
	const userLogged = useSelector((state) => state.reducer.logged);
	// TODO: faltan las reseñas

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getAllPopularMovies());
	}, []);

	const handleMovieDetail = (id) => {
		dispatch(cleanMovieDetail());
		dispatch(getMovieDetailById(id));
		dispatch(getReviewByMovieId(id));
		navigate(`/movies/${id}`);
	};

	return (
		<MovieCard
			movies={popularMovies}
			handleMovieDetail={handleMovieDetail}
			isFavorite={false}
		/>
	);
};

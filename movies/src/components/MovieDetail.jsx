import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, addToMovieReviews } from '../redux/actions/actions';
import { Button } from './generic-components/Button';
import { AddReview } from './AddReview';
import { addToMovieReview } from '../redux/reducers/reducer';

export const MovieDetail = () => {
	const dispatch = useDispatch();
	const movieDetail = useSelector((state) => state.reducer.movieDetail);
	const movieReviews = useSelector((state) => state.reducer.movieReviews);
	const personalReviews = useSelector((state) => state.reducer.reviews);
	const isLogged = useSelector((state) => state.reducer.logged);
	const genres = useSelector((state) => state.reducer.allGenres);

	// TODO: deberia mostrar las categorias a las que corresponde // opcional
	// TODO: el usuario deberia estar logueado para hacer todo
	// TODO: deberia poder crear una reseña. (el rating está listo pero la reseña tal vez no se pueda con la api sino con redux)

	// TODO: deberia mostrar las reseñas que tiene la pelicula

	const handleAddFavorite = () => {
		dispatch(
			addFavorite({
				...movieDetail,
				image: `http://image.tmdb.org/t/p/w300${movieDetail.backdrop_path}`,
			})
		);
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	useEffect(() => {
		const result = personalReviews.find((pr) => pr.movie_id === movieDetail.id);

		if (result) {
			dispatch(addToMovieReviews(result));
		}
	}, [personalReviews]);

	return (
		<div className="flex flex-col text-[white]">
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-[30px] text-center">{movieDetail?.title}</h1>
				<img
					src={`http://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`}
					alt={'image' + movieDetail?.id}
				/>
			</div>
			<div className="flex flex-col justify-center items-center m-2">
				<h1>Año de Lanzamiento:</h1>
				<p>{movieDetail?.release_date}</p>
			</div>
			<div className="flex flex-col justify-center items-center text-justify p-4">
				<h1 className="text-[24px]">Sinopsis:</h1>
				<p> {movieDetail?.overview}</p>
			</div>
			<div className="flex flex-col justify-center items-center text-justify p-4">
				<h2 className="text-[24px]">Generos:</h2>
				{movieDetail?.genres?.length > 0
					? movieDetail?.genres?.map((genre) => (
							<p key={genre.id}>{genre.name}</p>
					  ))
					: null}
			</div>
			<div className="flex flex-col justify-center items-center text-justify p-4">
				<p className="text-[24px]">Actores:</p>
				<div>
					{movieDetail.actors
						? movieDetail.actors.map((actor) => (
								<p key={actor.id}>{actor.name}</p>
						  ))
						: null}
				</div>
			</div>
			<div className="flex flex-col justify-center items-center text-justify p-4 ">
				<p className="text-[24px]">Directores:</p>
				<div>
					{movieDetail.directors
						? movieDetail.directors.map((dir) => <p key={dir.id}>{dir.name}</p>)
						: null}
				</div>
			</div>
			{/* // TODO: formatear la fecha */}

			<h1 className="flex flex-col justify-center items-center text-justify p-4 text-[24px]">
				Reviews
			</h1>
			<div className="p-6">
				{movieReviews.length > 0
					? movieReviews.map((mr, i) => (
							<div key={mr?.id || i}>
								<p className="font-semibold">
									User: {mr?.author_details?.username}
								</p>
								<h2 className="py-2">
									<strong className="font-semibold">Date:</strong>{' '}
									{formatDate(mr?.created_at)}
								</h2>
								<p className="font-semibold">Commented:</p>
								<p className="text-justify"> {mr?.content}</p>
								<br />
							</div>
					  ))
					: null}
			</div>

			{isLogged ? (
				<div className="flex flex-col items-center">
					<div className="flex flex-col w-[200px] items-center justify-center">
						<Button
							className="bg-[#DDDDDD] rounded-md h-[40px] p-2 flex items-center justify-center text-[black] text-[20px]"
							onClick={() => handleAddFavorite()}
							value="Add to Favorites"
						/>
						<AddReview movieDetail={movieDetail} />
					</div>
				</div>
			) : null}
		</div>
	);
};

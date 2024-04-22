import {
	genres,
	popularMovies,
	searchAndGetMovies,
	movieDetail,
	cleanDetail,
	movieReviews,
	getUserData,
	userLogged,
	addToFavorite,
	removeFromFavorite,
	addToReview,
	removeFromReview,
	addToMovieReview,
	searchByGenre,
} from '../reducers/reducer';
import axios from 'axios';

const token =
	'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzM4Mjc1OWQyMThmYjI3YTFjZGI4YjhkNmU3ZmMyYyIsInN1YiI6IjY2MjNjMzdkMTk3ZGU0MDE3ZDJhNWU1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qt3YQKjJLcY3iQe7KU0YVD7UDrFdurxJI3o-WRkpVBw';

// All genres
export const getAllGenres = () => async (dispatch) => {
	let response = await axios.get(
		'https://api.themoviedb.org/3/genre/movie/list',
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	dispatch(genres(response.data.genres));
};

export const filterByGenre = (genreId) => async (dispatch) => {
	let response = await axios.get(
		`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	response.data.results.map((movie) => {
		if (movie.backdrop_path == null) {
			movie.image = 'https://via.placeholder.com/300/92c952';
		}
		movie.image = `http://image.tmdb.org/t/p/w300${movie.backdrop_path}`;
	});
	if (!genreId) {
		dispatch(getAllPopularMovies());
	}
	dispatch(searchByGenre(response.data.results));
};

export const getAllPopularMovies = () => async (dispatch) => {
	let allMovies = [];

	for (let i = 0; i < 5; i++) {
		let response = await axios.get(
			`https://api.themoviedb.org/3/movie/popular?page=${i + 1}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		allMovies.push(...response.data.results);
	}

	allMovies = [...new Set(allMovies)];

	allMovies.map((movie) => {
		movie.image = `http://image.tmdb.org/t/p/w300${movie.backdrop_path}`;
	});

	dispatch(popularMovies(allMovies));
};

export const searchMovies = (value) => async (dispatch) => {
	let response = await axios.get(
		`https://api.themoviedb.org/3/search/movie?query=${value}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	response.data.results.map((movie) => {
		if (movie.backdrop_path == null) {
			movie.image = 'https://via.placeholder.com/300/92c952';
		}
		movie.image = `http://image.tmdb.org/t/p/w300${movie.backdrop_path}`;
	});

	dispatch(searchAndGetMovies(response.data.results));
	if (!value) {
		dispatch(getAllPopularMovies());
	}
};

export const getMovieDetailById = (id) => async (dispatch) => {
	const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const { data } = await axios.get(
		`https://api.themoviedb.org/3/movie/${id}/credits`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const actors = data.cast.slice(0, 5);
	const directors = data.crew.filter((crew) => crew.department === 'Directing');

	await dispatch(movieDetail({ ...response.data, actors, directors }));
};

export const cleanMovieDetail = () => async (dispatch) => {
	dispatch(cleanDetail());
};

export const createRating = (id, value) => async () => {
	try {
		const response = await axios.post(
			`https://api.themoviedb.org/3/movie/${id}/rating`,
			{
				value,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return response.data;
	} catch (err) {
		console.error(err);
	}
};

export const getReviewByMovieId = (id) => async (dispatch) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${id}/reviews`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		dispatch(movieReviews(response.data.results));
	} catch (err) {
		console.error(err);
	}
};

export const logIn =
	({ user, password }) =>
	async (dispatch) => {
		try {
			const { data } = await axios.get(
				'https://api.themoviedb.org/3/authentication/token/new',
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const response = await axios.post(
				'https://api.themoviedb.org/3/authentication/token/validate_with_login',
				{
					username: user,
					password,
					request_token: data.request_token,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				localStorage.setItem(
					'user',
					JSON.stringify({ ...response.data, user, favorites: [], reviews: [] })
				);
				dispatch(userLogged(true));
				dispatch(getUserData({ ...response.data, user }));
			}
		} catch (err) {
			console.error(err);
		}
	};

export const loggOut = () => async (dispatch) => {
	const userString = localStorage.getItem('user');
	const user = JSON.parse(userString);

	if (user.request_token) {
		localStorage.setItem(
			'user',
			JSON.stringify({ ...user, request_token: '' })
		);
		dispatch(getUserData({}));
		dispatch(userLogged(false));
	}
};

export const addFavorite = (payload) => async (dispatch) => {
	try {
		const userString = localStorage.getItem('user');
		const user = JSON.parse(userString);
		const { favorites } = JSON.parse(userString);

		const favoriteFinded = favorites.find((f) => f.id === payload.id);

		if (favoriteFinded) {
			throw new Error('The selected Movie is already on favorites');
		}

		localStorage.setItem(
			'user',
			JSON.stringify({
				...user,
				favorites: [...favorites, payload],
			})
		);
		dispatch(addToFavorite(payload));
	} catch (err) {
		console.error(err);
	}
};

export const removeFavorite = (id) => async (dispatch) => {
	const userString = localStorage.getItem('user');
	const user = JSON.parse(userString);
	const { favorites } = JSON.parse(userString);

	const favoritesFiltered = favorites.filter((fav) => fav.id !== id);

	localStorage.setItem(
		'user',
		JSON.stringify({
			...user,
			favorites: [...favoritesFiltered],
		})
	);

	dispatch(removeFromFavorite(id));
};

export const addReview = (payload) => async (dispatch) => {
	try {
		const userString = localStorage.getItem('user');
		const user = JSON.parse(userString);
		const { reviews } = JSON.parse(userString);

		const reviewFinded = reviews.find((rev) => rev.id === payload.id);

		if (reviewFinded) {
			throw new Error('The selected Movie is already on reviews');
		}

		localStorage.setItem(
			'user',
			JSON.stringify({
				...user,
				reviews: [...reviews, payload],
			})
		);
		dispatch(addToReview(payload));
	} catch (err) {
		console.error(err);
	}
};

export const removeReview = (id) => async (dispatch) => {
	const userString = localStorage.getItem('user');
	const user = JSON.parse(userString);
	const { reviews } = JSON.parse(userString);

	const reviewsFiltered = reviews.filter((rev) => rev.id !== id);

	localStorage.setItem(
		'user',
		JSON.stringify({
			...user,
			reviews: [...reviewsFiltered],
		})
	);

	dispatch(removeFromReview(id));
};

export const addToMovieReviews = (payload) => async (dispatch) => {
	dispatch(addToMovieReview(payload));
};

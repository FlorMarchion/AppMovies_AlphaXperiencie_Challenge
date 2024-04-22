import { createSlice } from '@reduxjs/toolkit';

const loggedString = localStorage.getItem('user');
const loggedUser = JSON.parse(loggedString);

const initialState = {
	allGenres: [],
	popularMovies: [],
	popularMoviesCopy: [],
	movieDetail: {},
	movieReviews: [],
	favorites: loggedUser?.favorites?.length > 0 ? loggedUser?.favorites : [],
	reviews: loggedUser?.reviews?.length > 0 ? loggedUser?.reviews : [],
	user: {},
	logged: loggedUser?.request_token ? true : false,
};

const generalSlice = createSlice({
	name: 'genres',
	initialState,
	reducers: {
		genres: (state, action) => {
			state.allGenres = action.payload;
		},
		searchByGenre: (state, action) => {
			state.popularMovies = action.payload;
		},
		popularMovies: (state, action) => {
			state.popularMovies = action.payload;
		},
		searchAndGetMovies: (state, action) => {
			state.popularMovies = action.payload;
		},
		movieDetail: (state, action) => {
			state.movieDetail = action.payload;
		},
		cleanDetail: (state, action) => {
			state.movieDetail = {};
		},
		movieReviews: (state, action) => {
			state.movieReviews = action.payload;
		},
		userLogged: (state, action) => {
			state.logged = action.payload;
		},
		getUserData: (state, action) => {
			state.user = action.payload;
		},
		addToFavorite: (state, action) => {
			state.favorites = [...state?.favorites, action.payload];
		},
		removeFromFavorite: (state, action) => {
			state.favorites = state?.favorites?.filter(
				(fav) => fav.id !== action.payload
			);
		},
		addToReview: (state, action) => {
			state.reviews = [...state?.reviews, action.payload];
		},
		removeFromReview: (state, action) => {
			state.reviews = state?.reviews?.filter(
				(rev) => rev.id !== action.payload
			);
		},
		addToMovieReview: (state, action) => {
			state.movieReviews = [...state?.movieReviews, action.payload];
		},
	},
});

export const {
	genres,
	searchByGenre,
	popularMovies,
	movieDetail,
	cleanDetail,
	movieReviews,
	userLogged,
	getUserData,
	logged,
	addToFavorite,
	removeFromFavorite,
	addToReview,
	removeFromReview,
	addToMovieReview,
	searchAndGetMovies,
} = generalSlice.actions;

export default generalSlice.reducer;

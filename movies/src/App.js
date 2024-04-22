import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllGenres } from './redux/actions/actions';
import { Movies } from './components/Movies';
import { MovieDetail } from './components/MovieDetail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Login } from './components/Login';
import { NavBar } from './components/NavBar';
import { Favorites } from './components/Favorites';
import { Profile } from './components/Profile';

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllGenres());
	}, []);

	return (
		<div className="bg-[#000000] w-full sm:w-full">
			<Router>
				<NavBar />
				<Routes>
					<Route path="/" element={<Movies />} />
					<Route path="/login" element={<Login />} />
					<Route path="/movies/:id" element={<MovieDetail />} />
					<Route path="/favorites" element={<Favorites />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</Router>
		</div>
	);
};
